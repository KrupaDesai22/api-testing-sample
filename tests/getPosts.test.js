import apiHelper from "../apiHelper";
import chai from "chai";
const expectChai = chai.expect;
const assertChai = chai.assert;
import schema_getAllPosts from "../schemas/getAllPosts.json";
import schema_getSinglePost from "../schemas/getSinglePost.json";

import Ajv from "ajv";

const url = "https://jsonplaceholder.typicode.com";
let ajv = new Ajv({ allErrors: true });

test("Validate the posts", async () => {
  const uri = "/posts";
  let responseBody;
  await apiHelper
    .get(url, uri, {}, {})
    .expect(200)
    .expect((response) => {
      responseBody = response.body;
      expectChai(response.body.length).to.be.at.least(100);
    });

  let validate = ajv.compile(schema_getAllPosts);
  let valid = validate(responseBody);

  //   if (valid) console.log("Schema is valid!");
  //   else console.log("Invalid: " + ajv.errorsText(validate.errors));
  expectChai(valid).to.be.true; //Fail the test if schema validation fails
});

test("Validate a single post", async () => {
  const id = "1";
  const uri = "/posts/" + id;
  let responseBody;
  await apiHelper
    .get(url, uri, {}, {})
    .expect(200)
    .expect((response) => {
      responseBody = response.body;
      assertChai.isNotArray(response.body);
      expectChai(response.body.id + "").to.equal(id);
    });

  let validate = ajv.compile(schema_getSinglePost);
  let valid = validate(responseBody);
  expectChai(valid).to.be.true; //Fail the test if schema validation fails
});

test("Validate the bad url", async () => {
  const uri = "/invalidposts";
  await apiHelper
    .get(url, uri, {}, {})
    .expect(404)
    .expect((response) => {
      console.log("response.body"); 
      console.log(response.body); //Printing on console to get on HTML report
      //There is no request body to print
    });
});
