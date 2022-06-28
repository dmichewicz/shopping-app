const back = document.querySelector(".back-list");
const wszystkoListBtn = document.querySelector(".wszystko-list-btn");
const addCustomListBtn = document.querySelector(".add-custom-item-list");
const listCategoriesContainer = document.querySelector(
  ".categories-chooser-list"
);
const searchListBtn = document.querySelector(".search-list");
const categoriesListBtns = document.querySelectorAll(".list-item");
const searchFieldList = document.querySelector(".search-field-list");

new Sortable(toBuy, {
  animation: 150,
});

document
  .querySelector(".wszystko-list")
  .addEventListener("click", () => openListCategory("wszystko"));

back.addEventListener("click", () => {
  listContainer.classList.add("hidden");
  introPage.classList.remove("hidden");
});

wszystkoListBtn.addEventListener("click", () =>
  categoriesChooser(listCategoriesContainer)
);

addCustomListBtn.addEventListener("click", () =>
  openAddCustom("produkt", "kategoria")
);

searchListBtn.addEventListener("click", () => showSearchField(searchFieldList));

searchFieldList.addEventListener("input", () =>
  searchItem(
    searchFieldList.value,
    ".list-item",
    ".list-item-name",
    wszystkoListBtn
  )
);

function openListCategory(category) {
  listCategoriesContainer.classList.add("hidden", "categories-close");
  wszystkoListBtn.innerText = category;
  dataItems = document.querySelectorAll(".list-item");

  if (category === "wszystko") {
    dataItems.forEach((item) => item.classList.remove("hidden"));
  } else {
    dataItems.forEach((item) => {
      item.classList.contains(category)
        ? item.classList.remove("hidden")
        : item.classList.add("hidden");
    });
  }
}
