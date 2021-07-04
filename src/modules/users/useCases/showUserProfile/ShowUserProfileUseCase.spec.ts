import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { ShowUserProfileError } from "./ShowUserProfileError"

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository
let showUserProfileUseCase: ShowUserProfileUseCase

describe("Show user profile", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository);
  })

  it("should be able show a user profile", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "Rodrigo",
      email: "rodrigo@example.com",
      password: "1234"
    })

    if (user.id) {
      const showProfile = await showUserProfileUseCase.execute(user.id);



      expect(showProfile).toHaveProperty("id")

    }

  });

  it("should not be able show a non-existing user", async () => {
    expect(async () => {
      const showProfile = await showUserProfileUseCase.execute("fake_id");
    }).rejects.toBeInstanceOf(ShowUserProfileError)

  });

})
