import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function InnovationDashboard() {
  // query supabase to get all teams
  const supabase = createClient();
  const { data: teams } = await supabase.from("team").select("*");

  return (
    <>
      <h1 className="text-4xl font-extrabold m-8">Liste des équipes </h1>
      <ul className="flex flex-row gap-4 flex-wrap">
        {teams &&
          teams.map((team) => (
            <li key={team.id}>
              <article className="border border-black p-4 rounded-2xl w-64 aspect-square flex flex-col justify-between">
                <h2 className="m-2">{`${team.name} - #${team.id}`}</h2>
                <section className="flex flex-col">
                <Link href={`/judge/innovation/${team.id}`} className="btn innovation">
                  Noter innovation
                </Link>
                <Link href={`/judge/design/${team.id}`} className="btn robot-design">
                  Noter design robot
                </Link>
                <Link href={`/judge/corevalues/${team.id}`} className="btn core-values">
                  Noter core values
                </Link>
                </section>
              </article>
            </li>
          ))}
      </ul>
    </>
  );
}

// className="focus:outline-none text-white bg-[--innovation-color] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
