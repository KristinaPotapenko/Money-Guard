export function prepareTransactionData(data) {
  if (data.category === "") {
    delete data.category;
  }
  data["primary_account_number"] = data["primary_account_number"].replace(
    /[^0-9]/g,
    ""
  );
  data["amount"] = parseFloat(data.amount);
  data["type"] = data["type"].toLowerCase();
  return data;
}
