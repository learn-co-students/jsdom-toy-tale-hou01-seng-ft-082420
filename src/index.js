let addToy = false;

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
});
let addToy = false;

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
});

function createToy(name, image, likes, id) {
  const div = document.createElement("div")
  const h2 = document.createElement("h2")
  h2.innerHTML = name
  const p = document.createElement("p")
  p.innerHTML = `${likes} Likes`
  const img = document.createElement("img")
  const button = document.createElement('button')
  button.innerHTML = "Like <3"
  div.classList.add("card")
  button.classList.add("like-btn")
  img.setAttribute('src', image)
  img.classList.add("toy-avatar")

  button.addEventListener('click', function (e) {
    console.log('clicked')
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: likes++
      })
    })
      .then(function (response) {
        return response.json()
      })
      .then(function (object) {
        p.innerHTML = `${likes} Likes`
      })
  })


  let collection = document.getElementById("toy-collection")
  collection.append(div)
  div.append(h2, img, p, button)
}

fetch('http://localhost:3000/toys')
  .then(function (response) {
    return response.json()
    console.log(json)
  })
  .then(function (json) {
    for (const toy of json) {
      createToy(toy.name, toy.image, toy.likes, toy.id)
    }
  })


const toyForm = document.querySelector('.add-toy-form')

toyForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value
  const image = document.getElementById('image').value

  createToy(name, image, 0)

  return fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0
    })
  })
})

