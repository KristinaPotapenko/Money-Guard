const photoAddButton = document.querySelector(
  ".user-information__photo-button"
);
const photoAddInput = document.querySelector(".account-form__file-input");

if (photoAddButton && photoAddInput) {
  photoAddButton.addEventListener("click", () => {
    photoAddInput.click();
  });
}

if (photoAddInput) {
  photoAddInput.addEventListener("change", (event) => {
    const image = event.target.files[0];

    if (image) {
      const reader = new FileReader();

      reader.addEventListener("load", (event) => {
        const imageElement = document.querySelector(".new-user-photo-js");
        imageElement.src = event.target.result;
      });
      reader.readAsDataURL(image);
    }
  });
}
