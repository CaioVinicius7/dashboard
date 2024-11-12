import { getDailyReceiptInPeriod } from "./getDailyReceiptInPeriod";
import { getMonthExpensesAmount } from "./getMonthExpensesAmount";
import { getMonthExpensesCount } from "./getMonthExpensesCount";
import { getMonthHighestExpense } from "./getMonthHighestExpense";
import { getMonthHighestSale } from "./getMonthHighestSale";
import { getMonthPendingPayments } from "./getMonthPendingPayments";
import { getMonthSalesAmount } from "./getMonthSalesAmount";
import { getMonthSalesCount } from "./getMonthSalesCount";
import { getMonthTotalProfit } from "./getMonthTotalProfit";

export const metricsService = {
  getDailyReceiptInPeriod,
  getMonthSalesCount,
  getMonthHighestSale,
  getMonthSalesAmount,
  getMonthExpensesCount,
  getMonthHighestExpense,
  getMonthExpensesAmount,
  getMonthTotalProfit,
  getMonthPendingPayments
};
