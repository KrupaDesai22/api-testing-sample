import apiHelper from "../apiHelper";
import chai from "chai";
const expectChai = chai.expect;
import schema_createPost from "../schemas/createPost.json";

import Ajv from "ajv";

const url = "https://jsonplaceholder.typicode.com";
let ajv = new Ajv({ allErrors: true });

test("Create Post", async () => {
  const uri = "/posts";
  let responseBody;
  let requestBody = {
    title: "foo",
    body: "bar",
    userId: 1,
  };

  await apiHelper
    .post(url, uri, requestBody, {})
    .expect(201)
    .expect((response) => {
      responseBody = response.body;
      expectChai(response.body.userId).to.equal(1); //Response should have the same UserID
    });

  let validate = ajv.compile(schema_createPost);
  let valid = validate(responseBody);
  expectChai(valid).to.be.true; //Fail the test if schema validation fails
});
