export async function getCountry() {
  const url = "https://restcountries.com/v3.1/all";

  const response = await fetch(url, {
    method: "GET",
  });

  return response;
}
