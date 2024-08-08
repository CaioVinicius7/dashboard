import { ArrowDownNarrowWide } from "lucide-react";

import { Header } from "@/components/Header";

export default async function ExpensesPage() {
  return (
    <>
      <Header title="Despesas" icon={<ArrowDownNarrowWide />} />
    </>
  );
}
