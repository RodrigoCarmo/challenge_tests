import { app } from "../../../../app";
import request from 'supertest';
import { Connection } from "typeorm";
import createConnection from '../../../../database/';
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";


let connection: Connection;


describe("Authenticate user controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations()
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able authenticate a user", async () => {
    await request(app).post("/api/v1/users").send({
      email: "joao@example.com", password: "1234"
    });


    const response = await request(app).post("/api/v1/sessions").send({
      email: "joao@example.com", password: "1234"
    });


    expect(response).not.toBeInstanceOf(IncorrectEmailOrPasswordError)
  });

  it("should not be able authenticate a non-existing user", async () => {

    const response = await request(app).post("/api/v1/sessions").send({
      email: "joao@example.com", password: "1234"

    });

    expect(response.status).toBe(401);

  });

  it("should be not able authenticate with incorrect password", async () => {
    await request(app).post("/api/v1/users").send({
      email: "example@example.com", password: "1234"
    });


    const response = await request(app).post("/api/v1/sessions").send({
      email: "example@example.com", password: "2222"
    });

    expect(response.status).not.toBe(201)
  });

})
