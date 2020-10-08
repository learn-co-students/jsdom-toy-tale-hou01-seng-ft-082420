let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector("form.add-toy-form")

  fetchToys();

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  //form to add new toy
  form.addEventListener("submit", function(e){
    e.preventDefault()
    // console.log(e.target.image.value)
    let name = e.target.name.value
    let image = e.target.image.value
    let likes = 0
    // addToToyBox(name, image, likes)
    createToy(name, image, likes)
    form.reset()
  })


});


function fetchToys(){
  const toysUrl = "http://localhost:3000/toys"
  
  fetch(toysUrl)
  .then(function(response){
    return response.json();
  })
  .then(function(toyData){
    // console.log(toyData)
    for (const toy of toyData){
      // console.log(toy)
      addToToyBox(toy.name, toy.image, toy.likes, toy.id)
    }
  })
}

function addToToyBox(name, image, likes, id) {
  const toyBox = document.getElementById("toy-collection")
  const div = document.createElement("div")
  const h2 = document.createElement("h2")
  const img = document.createElement("img")
  const p = document.createElement("p")
  const button = document.createElement("button")

  div.setAttribute('toyId', id)
  img.classList.add("toy-avatar")
  div.classList.add("card")
  button.classList.add("like-btn")
  h2.innerText = name
  img.src = image
  p.innerText = `${likes} likes`
  button.innerText = "Like <3"
  // img.style.height = "200px"
  // img.style.width = "200px"
  // img.style.objectFit = "contain"
  
  div.append(h2, img, p, button)
  toyBox.append(div)

  button.addEventListener("click", function(e){
    // console.log(e.target)
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": likes++
      })
    })
    .then(function(response){
      return response.json()
    })
    .then(function(data){
      p.innerText = `${likes} likes`
    })
  })
}

function createToy(name, image, likes) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: likes
    })
  })
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    addToToyBox(name, image, likes, id)
  })
}
