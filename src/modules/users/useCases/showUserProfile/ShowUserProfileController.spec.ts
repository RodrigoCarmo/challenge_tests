import { app } from "../../../../app";
import request from 'supertest';
import { Connection } from "typeorm";
import createConnection from '../../../../database/';

let connection: Connection;


describe("Show user profile", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should not be able a show user profile inexisting", async () => {
    await request(app).post("/api/v1/users").send({
      email: "joao@example.com", password: "1234"
    });


    const responseUser = await request(app).post("/api/v1/sessions").send({
      email: "joao@example.com", password: "1234"
    });


    const response = await request(app).get("/api/v1/profile")
    console.log(response)
    expect(response.status).toBe(401);

  });

})
