import { ModeToggle } from "@/components/themeToggle";

export default function Home() {
  return (
    <header className="flex items-center justify-between px-2 py-1">
      <h2>Dashboard</h2>

      <ModeToggle />
    </header>
  );
}
