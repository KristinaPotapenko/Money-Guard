const burgerButtonElement = document.querySelector(".burger-button");

if (burgerButtonElement) {
  burgerButtonElement.addEventListener("click", () => {
    const sidebarContentElement = document.querySelector(".sidebar__content");
    sidebarContentElement.classList.toggle("is-active");
    burgerButtonElement.classList.toggle("is-active");
    document.documentElement.classList.toggle("is-lock");
  });
}
