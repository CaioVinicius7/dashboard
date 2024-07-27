import { ModeToggle } from "@/components/ThemeToggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { metricsService } from "@/services/metrics";

import { RevenueChart } from "./RevenueChart";

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

      <div className="w-full px-4 py-2 sm:py-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Receita do mês
            </CardTitle>

            <CardDescription>Receita diária do mês atual</CardDescription>
          </CardHeader>

          <CardContent>
            <RevenueChart chartData={chartData} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
