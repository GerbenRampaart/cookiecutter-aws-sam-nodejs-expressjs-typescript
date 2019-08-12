/*
import * as supertest from "supertest";
import ExpressApp from "../app";

const request = supertest(ExpressApp);

describe("Tests app", () => {
  afterAll(() => {
    if (ExpressApp.listening) {
      ExpressApp.disable();
    }
  });

  it("verifies get", async () => {
    await request
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect({ Output: "Hello World!" })
      .expect(200);
  });
});
*/
