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
});
