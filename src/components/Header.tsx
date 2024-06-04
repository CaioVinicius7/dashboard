import { ModeToggle } from "./ThemeToggle";

export interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <h2 className="text-xl">{title}</h2>

      <ModeToggle />
    </header>
  );
}
