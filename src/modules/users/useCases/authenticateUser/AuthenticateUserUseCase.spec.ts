import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError"



let inMemoryUsersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let authenticateUserUseCase: AuthenticateUserUseCase

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
  })

  it("should be able authenticate a new user", async () => {


    expect(async () => {
      const user = await createUserUseCase.execute({
        name: "João",
        email: "joao@example.com",
        password: "1234"
      })

      await authenticateUserUseCase.execute({
        email: user.email,
        password: user.password
      });

    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)



  });

  // it("should not be able create a user already exists", async () => {



  // });


})
