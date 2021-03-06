const categoriesBtns = document.querySelector(".categories");
const categoriesChooseContainer = document.querySelector(".categories-chooser");
const logos = document.querySelectorAll(".circle");
const arrowIntro = document.querySelector(".arrow-intro");

const choose = document.querySelector("#choose");
let introBtns = [];
let toBuy = document.querySelector("#list");
let newProduct;
let currentListData = [];
let dataItems;
let storageData;
localStorage.getItem("shoppingList") === null
  ? (storageData = [])
  : (storageData = JSON.parse(localStorage.getItem("shoppingList")));
const showListBtn = document.querySelector(".show-list-intro");
const searchBtn = document.querySelector(".search-intro");
const searchField = document.querySelector(".search-field");
const refreshBtns = document.querySelectorAll(".refresh");
const listContainer = document.querySelector(".list-div");
const introPage = document.querySelector(".intro");
const addCustomItemBtn = document.querySelector(".add-custom-item-intro");
const addCustomCard = document.querySelector(".add-new-container");
let wszystkoBtn = document.querySelector(".wszystko-btn");
const catBackBtnIntro = document.querySelector(".cat-back-intro");

let currentCats = [];

let listItemIndex = 0;

Object.keys(data).forEach((category, index) => {
  btn = document.createElement("button");
  btn.classList.add(category, "category-btn");
  btn.innerText = category;

  categoriesChooseContainer.appendChild(btn);

  introBtns.push(btn);

  btn.addEventListener("click", () => openCategory(index, category));
});
introBtns.push(document.querySelector(".wszystko"));

class Product {
  constructor(product, category, amount) {
    this.product = product;
    this.category = category;
    this.amount = amount;
  }
  appendToList() {
    this.index = listItemIndex;
    this.item = document.createElement("li");
    this.item.classList.add(this.category, "list-item", this.index);
    this.infoContainer = document.createElement("div");
    this.infoContainer.classList.add("info-div");

    this.itemName = document.createElement("p");
    this.itemName.classList.add("list-item-name");
    this.itemName.innerText = this.product;

    this.amountDoc = document.createElement("p");
    this.amountDoc.innerText = this.amount;
    this.controlsDiv = document.createElement("div");
    this.controlsDiv.classList.add("item-controls");
    this.removeBtn = document.createElement("button");
    this.removeIcon = document.createElement("i");
    this.removeIcon.classList.add("fa", "fa-remove");
    this.removeBtn.classList.add("edit-item");
    this.checkBtn = document.createElement("button");
    this.checkIcon = document.createElement("i");
    this.checkIcon.classList.add("fa", "fa-check");
    this.checkBtn.classList.add("check");

    this.removeBtn.appendChild(this.removeIcon);
    this.checkBtn.appendChild(this.checkIcon);

    this.controlsDiv.appendChild(this.removeBtn);
    this.controlsDiv.appendChild(this.checkBtn);

    this.infoContainer.appendChild(this.itemName);
    this.infoContainer.appendChild(this.amountDoc);
    this.item.appendChild(this.infoContainer);
    this.item.appendChild(this.controlsDiv);
    toBuy.appendChild(this.item);
    currentListData.push(this);
    localStorage.setItem("shoppingList", JSON.stringify(currentListData));

    this.checkBtn.addEventListener("click", () =>
      this.item.classList.toggle("in-basket")
    );
    this.removeBtn.addEventListener("click", () => this.remove(this.item));
    listItemIndex++;

    checkItems();
  }

  // addToBasket(x) {
  //   x.classList.contains("in-basket")
  //     ? x.classList.add("in-basket")
  //     : x.classList.remove("in-basket");
  // }

  remove(x) {
    currentListData = currentListData.filter((item) => item != this);
    localStorage.setItem("shoppingList", JSON.stringify(currentListData));
    x.remove();
    checkItems();
  }
}
listItems();
listCurrentList();

const addFromDataBtns = document.querySelectorAll(".add-from-data-btn");

function openCategory(index, text) {
  dataItems = document.querySelectorAll(".item");
  categoriesChooseContainer.classList.add("hidden");
  categoriesChooseContainer.classList.add("categories-close");
  categoriesChooseContainer.classList.remove("categories-open");
  wszystkoBtn.innerText = `${text}`;
  wszystkoBtn.appendChild(arrowIntro);
  checkArrow(categoriesChooseContainer, arrowIntro);

  // if (text === "wszystko") {
  //   dataItems.forEach((item) => item.classList.remove("hidden"));
  // } else {
  dataItems.forEach((item) => {
    item.classList.contains(index)
      ? item.classList.remove("hidden")
      : item.classList.add("hidden");
  });
  // }
}

function listItems() {
  Object.values(data).forEach((category, index) => {
    category.forEach((item) => {
      newItem = document.createElement("button");
      newItem.innerText = item;
      newItem.classList.add(index, "item", "add-from-data-btn");
      choose.appendChild(newItem);
    });
  });
}

function listCurrentList() {
  if (storageData.length > 0) {
    storageData.forEach((item) => {
      prod = new Product(item.product, item.category, item.amount);
      prod.appendToList();
    });
  }
}

function addProduct(itemName, itemCategory, itemAmount) {
  newProduct = new Product(itemName, itemCategory, itemAmount);
  newProduct.appendToList();

  // if (searchField.classList.contains("search-field-open")) {
  //   searchField.classList.remove("search-field-open");
  //   searchField.classList.add("search-field-close");
  //   searchField.addEventListener("animationend", () =>
  //     searchField.classList.add("hidden")
  //   );
  // }

  // if (searchFieldList.classList.contains("search-field-open")) {
  //   searchFieldList.classList.remove("search-field-open");
  //   searchFieldList.classList.add("search-field-close");
  //   searchField.List.addEventListener("animationend", () =>
  //     searchFieldList.classList.add("hidden")
  //   );
  // }
  searchField.value = "";
  searchFieldList.value = "";
}

function openAddCustom(product, category) {
  addCustomCard.classList.remove("hidden");
  productInput.value = product;
  categoryInput.value = category;
  amountInput.value = 1;
}

function categoriesChooser(chooser, arrow) {
  // addFromDataBtns.forEach((btn) => btn.classList.add("hidden"));

  if (chooser.classList.contains("categories-close")) {
    chooser.classList.remove("hidden");
    chooser.classList.remove("categories-close");
    chooser.classList.add("categories-open");
    chooser.addEventListener("animationend", () =>
      chooser.classList.remove("hidden")
    );
  } else {
    chooser.classList.remove("categories-open");
    chooser.classList.add("categories-close");
    chooser.addEventListener("animationend", () =>
      chooser.classList.add("hidden")
    );
  }

  checkArrow(chooser, arrow);
}

function showSearchField(fieldName) {
  if (fieldName.classList.contains("search-field-close")) {
    fieldName.classList.remove("hidden", "search-field-close");
    fieldName.classList.add("search-field-open");
    fieldName.addEventListener("animationend", () =>
      fieldName.classList.remove("hidden")
    );
  } else {
    fieldName.classList.add("search-field-close");
    fieldName.addEventListener("animationend", () =>
      fieldName.classList.add("hidden")
    );
  }
  // searchField.style.animation = "searchOpener 1s ease";
}

function searchItem(input, items, txtItems, catBtn, arrow) {
  dataItems = document.querySelectorAll(items);
  dataTxtItems = document.querySelectorAll(txtItems);
  dataItems.forEach((item, index) => {
    input === ""
      ? (catBtn.innerText = "kategorie")
      : (catBtn.innerHTML = `zawierajace <br> "${input}"`);
    catBtn.appendChild(arrow);
    checkArrow(categoriesChooseContainer, arrow);
    dataTxtItems[index].innerText.includes(input)
      ? item.classList.remove("hidden")
      : item.classList.add("hidden");
  });
}

function checkArrow(chooser, arrow) {
  if (chooser.classList.contains("categories-close")) {
    arrow.classList.remove("fa-angle-up");
    arrow.classList.add("fa-angle-down");
  } else {
    arrow.classList.remove("fa-angle-up");
    arrow.classList.add("fa-angle-up");
  }
}

function showList() {
  listContainer.classList.remove("hidden");
  introPage.classList.add("hidden");
  dataItems = document.querySelectorAll(".list-item");

  currentListData.forEach((item, index) => {
    !currentCats.includes(item.category)
      ? currentCats.push(item.category)
      : null;
  });

  let stor1 = [];

  x = document.querySelectorAll(".list-category-btn");
  if (x.length > 0) {
    currentCats.forEach((cat) => {
      x.forEach((button) => {
        if (button.innerText == cat) {
          stor1.push(cat);
        }
      });
    });
    stor2 = currentCats.filter((cat) => !stor1.includes(cat));
    stor2.forEach((cat) => createListBtn(cat));
  } else {
    currentCats.forEach((cat) => createListBtn(cat));
  }
}

function createListBtn(cat) {
  btn = document.createElement("button");
  btn.classList.add(cat, "category-btn", "list-category-btn");
  btn.innerText = cat;
  listCategoriesContainer.appendChild(btn);
  btn.addEventListener("click", () => openListCategory(cat));

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
}

function checkItems() {
  currentListData.length === 0
    ? document.querySelector(".noitems").classList.remove("hidden")
    : document.querySelector(".noitems").classList.add("hidden");
}

function bounceLogo(logo) {
  logo.classList.add("animate__animated", "animate__swing");
  logo.addEventListener("animationend", () => {
    logo.classList.remove("animate__animated");
    logo.classList.remove("animate__swing");
  });
}

//event listeners

wszystkoBtn.addEventListener("click", () =>
  categoriesChooser(categoriesChooseContainer, arrowIntro)
);

// introBtns.forEach((btn, index) => {
//   btn.addEventListener("click", () => openCategory(index));
// });

addFromDataBtns.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    prod = e.target.innerText;
    Object.keys(data).forEach((category, index) => {
      e.target.classList.contains(index) ? (cat = category) : null;
    });
    openAddCustom(prod, cat);
  });
});
addCustomItemBtn.addEventListener("click", () =>
  openAddCustom("produkt", "kategoria")
);

showListBtn.addEventListener("click", showList);

searchBtn.addEventListener("click", () => showSearchField(searchField));

searchField.addEventListener("input", () =>
  searchItem(searchField.value, ".item", ".item", wszystkoBtn, arrowIntro)
);

logos.forEach((logo) => {
  logo.addEventListener("click", () => bounceLogo(logo));
  logo.addEventListener("mouseenter", () => bounceLogo(logo));
});

// introBtns.forEach((btn, index) => {
//   // btn.classList.remove("hidden");

// });

catBackBtnIntro.addEventListener("click", () => {
  if (searchField.classList.contains("search-field-open")) {
    searchField.classList.remove("search-field-open");
    searchField.classList.add("search-field-close");
    searchField.addEventListener("animationend", () =>
      searchField.classList.add("hidden")
    );
  }

  dataItems.forEach((item) => item.classList.remove("hidden"));
  wszystkoBtn.innerText = `kategorie`;
  wszystkoBtn.appendChild(arrowIntro);
  checkArrow(categoriesChooseContainer, arrowIntro);

  categoriesChooseContainer.classList.contains("categories-open")
    ? categoriesChooser(categoriesChooseContainer, arrowIntro)
    : null;
});
