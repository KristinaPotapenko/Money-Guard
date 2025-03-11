const container = document.querySelector(".card-information-js");

if (container) {
  container.addEventListener("click", (event) => {
    const toggleVisibilityElement = event.target.closest(".toggle-visibility");

    if (toggleVisibilityElement) {
      const informationBlock = toggleVisibilityElement.previousElementSibling;
      const visibleValue = informationBlock.firstElementChild.textContent;

      const hidingValue = informationBlock.querySelector(
        ".hidden-information-text"
      );
      const hiddenBlock = informationBlock.querySelector(".hidden-information");

      const message = "X".repeat(visibleValue.length);
      hidingValue.innerHTML = message;

      hiddenBlock.classList.toggle("visually-hidden");
    }
  });
}
