import request from "supertest";
import server from "../src/server.js";

import { describe, it, expect, beforeEach } from "@jest/globals";

const app = request(server);

beforeEach(async () => {
  const response = await app.post("/dev/reset");

  if (response.statusCode !== 204) {
    console.error("Could not reset database");
  }
});

describe("Required tests", () => {
  describe("CRUD operations /cafes", () => {
    describe("Check GET requests", () => {
      it("Should return status 200 and an array of cafes with at least 1 object", async () => {
        const response = await app.get("/cafes").send();

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toBeInstanceOf(Object);
      });
    });

    describe("Check POST requests", () => {
      it("Should return status 201 if a cafe is created", async () => {
        const validCafe = {
          name: "El mejor cafe del mundo",
        };

        const response = await app.post("/cafes").send(validCafe);

        expect(response.statusCode).toBe(201);
      });
    });

    describe("Check PUT requests", () => {
      it("Should return status 400 when updating a cafe with different id in payload and params", async () => {
        const idParam = 2;
        const idPayload = 3;

        const response = await app.put(`/cafes/${idParam}`).send({
          id: idPayload,
          name: "El mejor cafe de runaterra",
        });

        expect(response.statusCode).toBe(400);
      });
    });

    describe("Check DELETE requests", () => {
      it("Should return status 404 when deleting a non-existing cafe", async () => {
        const response = await app.delete("/cafes/999999999").send();

        expect(response.statusCode).toBe(404);
      });
    });
  });
});

describe("Additional Tests", () => {
  describe("CRUD operations /cafes", () => {
    describe("Check GET requests", () => {
      it("Should return status 200 and an object type when requesting a single existing cafe", async () => {
        const response = await app.get("/cafes/1").send();

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
      });

      it("Should return status 404 when requesting a non-existing cafe", async () => {
        const response = await app.get("/cafes/999999999").send();

        expect(response.statusCode).toBe(404);
      });

      it("Should return status 400 when requesting a cafe with an invalid id", async () => {
        const response = await app.get("/cafes/string").send();

        expect(response.statusCode).toBe(400);
      });
    });

    describe("Check POST requests", () => {
      it("Should return status 201 when creating a new cafe and a set location header", async () => {
        const response = await app
          .post("/cafes")
          .send({ name: "Test cafe strawberry" });

        expect(response.statusCode).toBe(201);
        expect(response.headers.location).toBeDefined();
      });

      it("Should return status 400 when creating a new cafe without a name", async () => {
        const response = await app.post("/cafes").send({});

        expect(response.statusCode).toBe(400);
      });

      it("Should return status 400 when creating a new cafe with an empty name", async () => {
        const response = await app.post("/cafes").send({ name: "" });

        expect(response.statusCode).toBe(400);
      });

      it("Should return status 409 when creating a new cafe with an existing name", async () => {
        const firstResponse = await app
          .post("/cafes")
          .send({ name: "Test cafe strawberry" });

        const response = await app
          .post("/cafes")
          .send({ name: "Test cafe strawberry" });

        expect(firstResponse.status).toBe(201);
        expect(response.statusCode).toBe(409);
      });
    });

    describe("Check PUT requests", () => {
      it("Should return status 200 when existing cafe is updated and response body is of type object", async () => {
        const id = 1;

        const response = await app
          .put(`/cafes/${id}`)
          .send({ name: "Test cafe chocolate", id });

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
      });

      it("Should return status 404 when updating a non-existing cafe", async () => {
        const id = 5555555;

        const response = await app
          .put(`/cafes/${id}`)
          .send({ name: "Ice Tea", id });

        expect(response.statusCode).toBe(404);
      });

      it("Should return status 409 when updating a cafe with an existing name", async () => {
        const id = 1;
        const newName = "Test cafe chocolate";

        const firstResponse = await app.put(`/cafes/${id}`).send({
          name: newName,
          id,
        });
        const response = await app
          .put(`/cafes/${id}`)
          .send({ name: newName, id });

        expect(firstResponse.statusCode).toBe(200);
        expect(response.statusCode).toBe(409);
      });

      it("Should return status 400 when updating a cafe without a name", async () => {
        const id = 1;

        const response = await app.put(`/cafes/${id}`).send({ id });

        expect(response.statusCode).toBe(400);
      });
    });

    describe("Check DELETE requests", () => {
      it("Should return status 204 when deleting a cafe", async () => {
        const response = await app.delete("/cafes/1");

        expect(response.statusCode).toBe(204);
      });

      it("Should return status 404 when deleting a non-existing cafe", async () => {
        const response = await app.delete("/cafes/999999999");

        expect(response.statusCode).toBe(404);
      });

      it("Should return status 400 when deleting a cafe with an invalid id", async () => {
        const response = await app.delete("/cafes/string");

        expect(response.statusCode).toBe(400);
      });
    });
  });
});
