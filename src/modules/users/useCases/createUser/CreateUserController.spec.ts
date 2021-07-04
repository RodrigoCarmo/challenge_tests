import { app } from "../../../../app";
import request from 'supertest';
import { Connection } from "typeorm";
import createConnection from '../../../../database/';

let connection: Connection;


describe("Create user controller", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able a create a new user", async () => {
    const response = await request(app).post("/api/v1/users").send({
      name: "Name_test", email: "email@test.com", password: "1234"
    })

    expect(response.status).toBe(201);

  });

  it("should not be able create a user already exists", async () => {
    await request(app).post("/api/v1/users").send({
      name: "Name_test", email: "email@test.com", password: "1234"
    })

    const response = await request(app).post("/api/v1/users").send({
      name: "Name_test", email: "email@test.com", password: "1234"
    })

    expect(response.status).toBe(400);


  });
})
