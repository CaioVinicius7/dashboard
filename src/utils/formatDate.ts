import { formatInTimeZone } from "date-fns-tz";

export function formatDate(date: string) {
  return formatInTimeZone(date, "America/Sao_Paulo", "dd/MM/yyyy");
}
