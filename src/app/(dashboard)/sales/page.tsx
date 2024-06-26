import type { Metadata } from "next";

import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Vendas"
};

export default function SalesPage() {
  return (
    <>
      <Header title="Vendas" />

      <h1>Sales</h1>
    </>
  );
}
