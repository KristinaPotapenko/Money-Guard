export function prepareUserFormData(data) {
  data.delete("profile_picture");

  const file = document.querySelector(".account-form__file-input");

  if (file && file.files[0]) {
    const fileData = file.files[0];
    data.append("profile_picture", fileData);
  }

  const dataObject = Object.fromEntries(data.entries());

  for (const key in dataObject) {
    switch (dataObject[key]) {
      case "":
        data.delete(key);
        break;
      case "undefined":
        data.delete(key);
        break;
      case "Profession":
        data.delete(key);
        break;
      case "Country":
        data.delete(key);
        break;
      case "City":
        data.delete(key);
        break;
      case "Gender":
        data.delete(key);
        break;
      case "Male":
        data.set(key, "male");
        break;
      case "Female":
        data.set(key, "female");
        break;
    }
  }

  return data;
}
