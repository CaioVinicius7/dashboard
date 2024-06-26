import { ModeToggle } from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <>
      <header className="flex items-center justify-between p-4">
        <h2>Dashboard</h2>

        <ModeToggle />
      </header>
    </>
  );
}
