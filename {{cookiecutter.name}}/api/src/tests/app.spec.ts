"use strict";

import * as supertest from "supertest";
import { ExpressApplication } from "./app";

const ea = new ExpressApplication();
const request = supertest(ea.app);

describe("Tests app", () => {
    afterAll(() => {
        if (ea.server.listening) {
            ea.server.close();
        }
    });

    // https://hackernoon.com/api-testing-using-supertest-1f830ce838f1
    it("verifies get", async () => {
        await request
            .get("/")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect({ Output: "Hello World!" })
            .expect(200);
    });
});
