import { ModeToggle } from "@/components/themeToggle";

export default function Home() {
  return (
    <>
      <header className="flex items-center justify-between p-4">
        <h2>Dashboard</h2>

        <ModeToggle />
      </header>
    </>
  );
}
