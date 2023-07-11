import { db } from "./db";

export async function addMockUsers() {
  const users = [
    {
      firstName: "Alice",
      lastName: "Johnson",
    },
    {
      firstName: "Bob",
      lastName: "Smith",
    },
    {
      firstName: "Jane",
      lastName: "Doe",
    },
    {
      firstName: "John",
      lastName: "Doe",
    },
    {
      firstName: "Johnny",
      lastName: "Johnson",
    },
  ];
  await Promise.all(
    users.map((user) => {
      return db.user.create({ data: user });
    })
  );
}
