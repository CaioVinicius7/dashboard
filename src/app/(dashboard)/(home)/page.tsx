import { Home } from "lucide-react";

import { Header } from "@/components/Header";
import { metricsService } from "@/services/metrics";

import { MonthHighestSaleCard } from "./components/MonthHighestSaleCard";
import { MonthSalesAmountCard } from "./components/MonthSalesAmountCard";
import { MonthSalesCountCard } from "./components/MonthSalesCountCard ";
import { RevenueChart } from "./components/RevenueChart";

export default async function HomePage() {
  const { data: chartData } = await metricsService.getDailyReceiptInPeriod({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });

  return (
    <>
      <Header title="Página inicial" icon={<Home />} />

      <main className="w-full space-y-4 px-4 py-2 sm:py-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MonthSalesCountCard />

          <MonthSalesAmountCard />

          <MonthHighestSaleCard />
        </div>

        <RevenueChart chartData={chartData} />
      </main>
    </>
  );
}
