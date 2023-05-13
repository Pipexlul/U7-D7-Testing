import request from "supertest";
import server from "../index.js";

import { describe, it, expect } from "@jest/globals";

const app = request(server);

describe("Operaciones CRUD de cafes", () => {
  describe("Chequear ruta GET /cafes", () => {
    it("Deberia devolver un status code de 200 y un array de cafes con al menos 1 objeto dentro del array", async () => {
      const response = await app.get("/cafes").send();
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("Chequear ruta DELETE /cafes/:id", () => {
    it("Deberia devolver un status code de 404 si se intenta eliminar un cafe que no existe", async () => {
      const response = await app
        .delete("/cafes/999999999")
        .set("Authorization", "Bearer token")
        .send();

      expect(response.statusCode).toBe(404);
    });
  });

  describe("Chequear ruta POST /cafes", () => {
    const validCafe = {
      id: 5,
      nombre: "Test cafe",
    };

    const invalidCafe = {
      id: 4,
      nombre: "Ya existe",
    };

    it("Deberia devolver un status code de 201 al crear un cafe con id nueva", async () => {
      const validCall = await app.post("/cafes").send(validCafe);

      expect(validCall.statusCode).toBe(201);
    });

    it("Deberia devolver un status code de 400 si se intenta crear un cafe que ya existe", async () => {
      const invalidCall = await app.post("/cafes").send(invalidCafe);

      expect(invalidCall.statusCode).toBe(400);
    });
  });
});
