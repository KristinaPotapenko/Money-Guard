export function prepareCardFormData(data) {
  data["balance"] = parseFloat(data.balance);
  data["expiration_date"] = convertToDateTime(data["expiration_date"]);
  data["primary_account_number"] = data["primary_account_number"].replace(
    /[^0-9]/g,
    ""
  );

  return data;
}

function convertToDateTime(mmYYYY) {
  const [month, year] = mmYYYY.split("/").map(Number);

  const date = new Date(Date.UTC(year, month - 1, 1));

  return date.toISOString().split("T")[0];
}
