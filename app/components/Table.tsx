"use client";
import { Person } from "../page";
import { useRouter } from "next/navigation";

export default function Table({
  persons,
  deletePerson,
}: {
  persons: Person[];
  deletePerson: (formData: FormData) => void;
}) {
  const router = useRouter();
  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {persons.map(({ id, firstName, lastName }) => (
          <tr
            key={`person-${id}`}
            onDoubleClick={() => router.push(`/edit/${id}`)}
          >
            <td>{id}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>
              <form action={deletePerson}>
                <input type="hidden" value={id} name="person-id" />
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </form>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
