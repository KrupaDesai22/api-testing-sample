import apiHelper from "../apiHelper";
import chai from "chai";
const expectChai = chai.expect;
import schema_updatePost from "../schemas/updatePost.json";

import Ajv from "ajv";

const url = "https://jsonplaceholder.typicode.com";
let ajv = new Ajv({ allErrors: true });

test("Create Post", async () => {
  const uri = "/posts/1";
  let responseBody;
  let requestBody = {
    id: 1,
    title: "abc",
    body: "xyz",
    userId: 1,
  };

  await apiHelper
    .put(url, uri, requestBody, {})
    .expect(200)
    .expect((response) => {
      responseBody = response.body;
      expectChai(response.body.userId).to.equal(1); //Response should have the same UserID
    });

  let validate = ajv.compile(schema_updatePost);
  let valid = validate(responseBody);
  expectChai(valid).to.be.true; //Fail the test if schema validation fails
});
