import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserError } from "./CreateUserError"
import { CreateUserUseCase } from "./CreateUserUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  })

  it("should be able create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "João",
      email: "joao@example.com",
      password: "1234"
    });



    expect(user).toHaveProperty('id')

  });

  it("should not be able create a user already exists", async () => {

    expect(async () => {
      await createUserUseCase.execute({
        name: "João",
        email: "joao@example.com",
        password: "1234"
      });

      await createUserUseCase.execute({
        name: "João",
        email: "joao@example.com",
        password: "1234"
      });

    }).rejects.toBeInstanceOf(CreateUserError)

  });


})
