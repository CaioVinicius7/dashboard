import { ModeToggle } from "@/components/ThemeToggle";
import { metricsService } from "@/services/metrics";

import { RevenueChart } from "./components/RevenueChart";

export default async function HomePage() {
  const { data: chartData } = await metricsService.getDailyReceiptInPeriod({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });

  return (
    <>
      <header className="flex items-center justify-between p-4">
        <h2>Dashboard</h2>

        <ModeToggle />
      </header>

      <div className="w-full space-y-4 px-4 py-2 sm:py-6">
        <RevenueChart chartData={chartData} />
      </div>
    </>
  );
}
