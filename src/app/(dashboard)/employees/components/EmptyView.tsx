import { SearchX } from "lucide-react";

export function EmptyView() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-3 pt-16">
      <SearchX className="size-16" />

      <div className="max-w-[550px] space-y-2 text-center">
        <h2 className="text-2xl">Nenhum Funcionário Encontrado</h2>

        <p className="text-sm">
          Nenhum funcionário foi encontrado com os filtros atuais. Por favor,
          altere os filtros ou cadastre novos funcionários para começar a
          visualizá-los aqui.
        </p>
      </div>
    </div>
  );
}
