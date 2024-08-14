import { getDailyReceiptInPeriod } from "./getDailyReceiptInPeriod";
import { getMonthExpensesAmount } from "./getMonthExpensesAmount";
import { getMonthExpensesCount } from "./getMonthExpensesCount";
import { getMonthHighestExpense } from "./getMonthHighestExpense";
import { getMonthHighestSale } from "./getMonthHighestSale";
import { getMonthSalesAmount } from "./getMonthSalesAmount";
import { getMonthSalesCount } from "./getMonthSalesCount";

export const metricsService = {
  getDailyReceiptInPeriod,
  getMonthSalesCount,
  getMonthHighestSale,
  getMonthSalesAmount,
  getMonthExpensesCount,
  getMonthHighestExpense,
  getMonthExpensesAmount
};
