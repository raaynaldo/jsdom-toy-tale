let addToy = false;
const URL = "http://localhost:3000/toys";

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  getToys();
  createToy();
});

function getToys() {
  fetch(URL)
    .then((resp) => resp.json())
    .then((toyArray) => {
      toyArray.forEach((toy) => renderToys(toy));
    });
}

function renderToys(toy) {
  let divToyCollection = document.getElementById("toy-collection");

  let card = document.createElement("div");
  card.id = `toy-${toy.id}`;
  card.classList.add("card");

  let title = document.createElement("h2");
  title.innerHTML = toy.name;

  let img = document.createElement("img");
  img.classList.add("toy-avatar");
  img.src = toy.image;

  let par = document.createElement("p");
  par.innerHTML = toy.likes;

  let button = document.createElement("button");
  button.classList = "like-btn";
  button.innerHTML = "Like ♥";
  button.addEventListener("click", updateLike);

  card.appendChild(title);
  card.appendChild(img);
  card.appendChild(par);
  card.appendChild(button);

  divToyCollection.appendChild(card);
}

function createToy() {
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    //  console.log(event.target.image);

    let data = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0,
    };

    let Obj = {};
    Obj.method = "POST";
    Obj.headers = { "Content-Type": "application/json" };
    Obj.body = JSON.stringify(data);

    fetch(URL, Obj)
      .then((res) => res.json())
      .then(json => renderToys(json));
  });
}

function updateLike(event) {
  let id = event.target.parentElement.id.split("-")[1];
  let likes = event.target.previousSibling.innerHTML;
  console.log(id, likes);

  let data = {
    likes: parseInt(likes) + 1,
  };

  let Obj = {};
  Obj.method = "PATCH";
  Obj.headers = { "Content-Type": "application/json" };
  Obj.body = JSON.stringify(data);

  fetch(`${URL}/${id}`, Obj)
    .then((res) => res.json())
    .then((json) => {
      event.target.previousSibling.innerHTML = json.likes
    });
}
