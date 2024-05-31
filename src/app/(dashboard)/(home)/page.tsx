import { getServerSession } from "next-auth";

import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { ModeToggle } from "@/components/themeToggle";

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <>
      <header className="flex items-center justify-between p-4">
        <h2>Dashboard</h2>

        <ModeToggle />
      </header>

      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}
