export function prepareUpdateCardData(data) {
  data["expiration_date"] = convertToDateTime(data["expiration_date"]);

  return data;
}
function convertToDateTime(mmYYYY) {
  const [month, year] = mmYYYY.split("/").map(Number);

  const date = new Date(Date.UTC(year, month - 1, 1));

  return date.toISOString().split("T")[0];
}
