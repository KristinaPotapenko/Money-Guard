import { fetchData } from "./api-service";

export async function getExpenseCategories() {
  const response = await fetchData("transactions/categories");

  return response;
}
