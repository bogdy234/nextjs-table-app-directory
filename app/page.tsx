import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import Table from "./components/Table";

export type Person = {
  id: number;
  firstName: string;
  lastName: string;
};

export default async function Home() {
  const persons: Person[] = await db.user.findMany();

  async function addPerson() {
    "use server";
    await db.user.create({
      data: {
        firstName: "New",
        lastName: "Person",
      },
    });
    revalidatePath("/");
  }

  async function deletePerson(formData: FormData) {
    "use server";
    const id = parseInt(formData.get("person-id") as string);
    await db.user.delete({
      where: {
        id,
      },
    });
    revalidatePath("/");
  }

  return (
    <main className="flex min-h-screen flex-col justify-center items-center text-3xl">
      <Table persons={persons} deletePerson={deletePerson} />
      <form action={addPerson}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10">
          Add person
        </button>
      </form>
    </main>
  );
}
