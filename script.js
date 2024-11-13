/////////////////////////
// Elements
const form = document.querySelector(".form");
const inputText = document.querySelector(".input__text");
const listContainer = document.querySelector(".list__container");
const list = document.querySelector(".list__items");
let listItems = Array.from(document.querySelectorAll(".list__item"));
let newItems = [];
const btnRemove = document.querySelector(".remove__item");

const saveToLocalStorage = function () {
  localStorage.setItem("toDo", JSON.stringify(newItems));
};

const getLocalStorage = function () {
  const storedItems = JSON.parse(localStorage.getItem("toDo"));
  if (!storedItems) return;
  newItems = storedItems;
  console.log(newItems);

  newItems.forEach((obj) => {
    console.log(obj);
    renderItem(obj);
  });
};

const generateMarkup = function (obj) {
  return `<li class="list__item">
  <div class="todo__info">
    <span class="item__text">${obj.activity}</span>
    <div class="priority ${obj.priority}">${obj.priority}</div>
  </div>
  <div class="item__options">
  
  <button class="remove__item">×</button>

</div>
</li>`;
};

const renderItem = function (item) {
  const markup = generateMarkup(item);
  list.insertAdjacentHTML("afterbegin", markup);

  listItems = Array.from(document.querySelectorAll(".list__item"));
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = Array.from(new FormData(form));

  const obj = Object.fromEntries(data);
  inputText.value = "";
  newItems.push(obj);
  saveToLocalStorage();

  renderItem(obj);
});

listContainer.addEventListener("click", function (e) {
  const item = e.target.closest(".list__item");
  if (!item) return;

  item.classList.toggle("checked");
});

const removeItem = function (index, obj) {
  const localStorageArr = JSON.parse(localStorage.getItem("toDo"));
  console.log(localStorageArr);
  const localStorageIndex = localStorageArr.findIndex(
    (item) => JSON.stringify(item) === JSON.stringify(obj)
  );
  localStorageArr.splice(localStorageIndex, 1);
  console.log(localStorageArr);
  localStorage.clear();
  localStorage.setItem("toDo", JSON.stringify(localStorageArr));

  listItems[index].remove();
  listItems.splice(index, 1);
};

listContainer.addEventListener("click", function (e) {
  const btn = e.target.closest(".remove__item");
  if (!btn) return;
  const item = e.target.closest(".list__item");

  const task = item.querySelector(".item__text");
  const obj = newItems.find((data) => {
    return task.textContent === data.activity;
  });
  console.log("object:", obj);
  const index = Array.from(list.children).findIndex(
    (li) =>
      li.querySelector(".item__text").textContent ===
      item.querySelector(".item__text").textContent
  );
  console.log(index);
  removeItem(index, obj);
});
getLocalStorage();
