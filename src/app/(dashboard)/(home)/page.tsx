import { Home } from "lucide-react";

import { Header } from "@/components/Header";
import { metricsService } from "@/services/metrics";
import { CURRENT_MONTH, CURRENT_YEAR } from "@/utils/constants";

import { MonthExpensesAmountCard } from "./components/MonthExpensesAmountCard";
import { MonthExpensesCountCard } from "./components/MonthExpensesCountCard";
import { MonthHighestExpenseCard } from "./components/MonthHighestExpenseCard";
import { MonthPendingPaymentsCard } from "./components/MonthPendingPaymentsCard";
import { MonthSalesAmountCard } from "./components/MonthSalesAmountCard";
import { MonthSalesCountCard } from "./components/MonthSalesCountCard ";
import { MonthTotalProfitCard } from "./components/MonthTotalProfitCard";
import { RevenueChart } from "./components/RevenueChart";

export const revalidate = 10; // 10 seg

export default async function HomePage() {
  const { data: chartData } = await metricsService.getDailyReceiptInPeriod({
    month: CURRENT_MONTH,
    year: CURRENT_YEAR
  });

  return (
    <>
      <Header title="Página inicial" icon={<Home />} />

      <main className="w-full space-y-4 px-4 py-2 sm:py-6">
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          <div className="w-full space-y-4 md:w-4/6 3xl:w-4/5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <MonthSalesCountCard />

              <MonthSalesAmountCard />

              <MonthPendingPaymentsCard />

              <MonthExpensesCountCard />

              <MonthExpensesAmountCard />

              <MonthHighestExpenseCard />
            </div>
          </div>

          <MonthTotalProfitCard />
        </div>

        <RevenueChart chartData={chartData} />
      </main>
    </>
  );
}
