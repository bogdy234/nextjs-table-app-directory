import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function EditPerson({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);

  const person = await db.user.findUnique({
    where: {
      id,
    },
  });

  async function editPerson(formData: FormData) {
    "use server";
    const id = parseInt(formData.get("person-id") as string);
    const firstName = formData.get("first-name") as string;
    const lastName = formData.get("last-name") as string;
    await db.user.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
      },
    });
    revalidatePath("/");
    redirect("/");
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-10">
      <form action={editPerson}>
        <input type="hidden" name="person-id" value={id} />
        <div className="flex flex-col">
          <label htmlFor="first-name">First name</label>
          <input
            type="text"
            name="first-name"
            defaultValue={person?.firstName}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="last-name">Last name</label>
          <input
            type="text"
            name="last-name"
            defaultValue={person?.lastName}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
}
