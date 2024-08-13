import type { Expense } from "@/entities/Expense";
import { httpClient } from "@/lib/ky";

interface ListExpensesParams {
  page?: number;
  perPage?: number;
  title?: string;
  year?: number;
  month?: number;
}

interface ListExpensesResponse {
  expenses: Expense[];
  meta: {
    totalCount: number;
    page: number;
    perPage: number;
  };
}

export async function list({
  page = 1,
  perPage = 8,
  title,
  year,
  month
}: ListExpensesParams) {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString()
  });

  if (!!title) {
    searchParams.set("title", title);
  }

  if (!!year) {
    searchParams.set("year", year.toString());
  }

  if (!!month) {
    searchParams.set("month", month.toString());
  }

  const { expenses, meta } = await httpClient
    .get("expenses/list", {
      searchParams
    })
    .json<ListExpensesResponse>();

  return {
    expenses,
    meta
  };
}
