import { getDailyReceiptInPeriod } from "./getDailyReceiptInPeriod";
import { getMonthHighestSale } from "./getMonthHighestSale";
import { getMonthSalesCount } from "./getMonthSalesCount";

export const metricsService = {
  getDailyReceiptInPeriod,
  getMonthSalesCount,
  getMonthHighestSale
};
