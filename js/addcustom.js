const closeCustomBtn = document.querySelector(".close-custom");
const addCustomBtn = document.querySelector(".add");
const productInput = document.querySelector("input.product");
const categoryInput = document.querySelector("input.category");
const amountInput = document.querySelector("input.amount");
const upBtn = document.querySelector(".arrow-up");
const downBtn = document.querySelector(".arrow-down");
addCustomBtn.addEventListener("click", () => {
  addProduct(productInput.value, categoryInput.value, amountInput.value);
  closeCustom();
});

closeCustomBtn.addEventListener("click", closeCustom);

upBtn.addEventListener("click", () => amountInput.stepUp());
downBtn.addEventListener("click", () => amountInput.stepDown());

// window.addEventListener("click", (e) => {
//   if (
//     !e.target.classList.contains("add-new-container") &&
//     addCustomCard.classList.contains("hidden")
//   ) {
//     closeCustom();
//   }
// });

function closeCustom() {
  addCustomCard.classList.add("hidden");
  window.removeEventListener("click", console.log("heii"));
}
