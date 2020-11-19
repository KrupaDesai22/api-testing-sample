import apiHelper from "../apiHelper";
import chai from "chai";
const expectChai = chai.expect;
const assertChai = chai.assert;
import Ajv from "ajv";

const url = "https://jsonplaceholder.typicode.com";
let ajv = new Ajv({ allErrors: true });

test("Delete Post", async () => {
  const uri = "/posts/1";
  let responseBody;
  let requestBody = {
    id: 1,
    title: "abc",
    body: "xyz",
    userId: 1,
  };
  await apiHelper
    .del(url, uri, requestBody, {})
    .expect(200)
    .expect((response) => {
      responseBody = response.body;
      assertChai.isNotArray(response.body);
    });
});
