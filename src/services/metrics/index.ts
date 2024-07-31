import { getDailyReceiptInPeriod } from "./getDailyReceiptInPeriod";
import { getMonthHighestSale } from "./getMonthHighestSale";
import { getMonthSalesAmount } from "./getMonthSalesAmount";
import { getMonthSalesCount } from "./getMonthSalesCount";

export const metricsService = {
  getDailyReceiptInPeriod,
  getMonthSalesCount,
  getMonthHighestSale,
  getMonthSalesAmount
};
