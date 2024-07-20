import type { ReactElement } from "react";

export interface HeaderProps {
  title: string;
  icon: ReactElement;
}

export function Header({ title, icon }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        {icon}

        <h2 className="text-xl">{title}</h2>
      </div>

      <div />
    </header>
  );
}
