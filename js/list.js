const back = document.querySelector(".back-list");
const wszystkoListBtn = document.querySelector(".wszystko-list-btn");
const addCustomListBtn = document.querySelector(".add-custom-item-list");
const listCategoriesContainer = document.querySelector(
  ".categories-chooser-list"
);
const searchListBtn = document.querySelector(".search-list");
const categoriesListBtns = document.querySelectorAll(".list-item");
const searchFieldList = document.querySelector(".search-field-list");
const arrowList = document.querySelector(".arrow-list");
const catBackBtnList = document.querySelector(".cat-back-list");

new Sortable(toBuy, {
  animation: 150,
});

back.addEventListener("click", () => {
  listContainer.classList.add("hidden");
  introPage.classList.remove("hidden");
});

wszystkoListBtn.addEventListener("click", () => {
  categoriesChooser(listCategoriesContainer, arrowList);
});

addCustomListBtn.addEventListener("click", () =>
  openAddCustom("produkt", "kategoria")
);

searchListBtn.addEventListener("click", () => showSearchField(searchFieldList));

searchFieldList.addEventListener("input", () =>
  searchItem(
    searchFieldList.value,
    ".list-item",
    ".list-item-name",
    wszystkoListBtn,
    arrowList
  )
);

catBackBtnList.addEventListener("click", () => {
  wszystkoListBtn.innerText = "kategorie";
  wszystkoListBtn.appendChild(arrowList);
  dataItems.forEach((item) => item.classList.remove("hidden"));
  if (listCategoriesContainer.classList.contains("categories-open")) {
    categoriesChooser(listCategoriesContainer, arrowList);
  }
  if (searchFieldList.classList.contains("search-field-open")) {
    searchFieldList.classList.remove("search-field-open");
    searchFieldList.classList.add("search-field-close");
    searchFieldList.addEventListener("animationend", () =>
      searchFieldList.classList.add("hidden")
    );
  }
});

function clearList() {
  let checker = document.querySelector(".remove-check");
  let popup = document.querySelector(".remove-popup");

  checker.classList.remove("hidden");

  document.querySelectorAll(".rmv-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      if (index === 0) {
        checker.classList.add("hidden");
      } else {
        document
          .querySelectorAll(".list-item")
          .forEach((item) => item.remove());
        dataItems = [];
        currentListData = [];
        localStorage.clear();
        checker.classList.add("hidden");
        popup.classList.remove("hidden");
        setTimeout(() => popup.classList.add("hidden"), 1000);
      }
    });
  });
}

function openListCategory(category) {
  listCategoriesContainer.classList.add("hidden", "categories-close");
  listCategoriesContainer.classList.remove("categories-open");
  wszystkoListBtn.innerText = category;
  wszystkoListBtn.appendChild(arrowList);
  checkArrow(listCategoriesContainer, arrowList);
  dataItems = document.querySelectorAll(".list-item");

  // dataItems.forEach((item) => item.classList.remove("hidden"));
  dataItems.forEach((item) => {
    item.classList.contains(category)
      ? item.classList.remove("hidden")
      : item.classList.add("hidden");
  });
}

refreshBtns.forEach((btn) => {
  btn.addEventListener("click", clearList);
});
