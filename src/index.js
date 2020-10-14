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


fetch("http://localhost:3000/toys")
.then(function(response) {
  return response.json();
})
.then(function(json) {
for(toy of json) {
 createCard(toy.name, toy.image, `${toy.likes} likes`, toy.id)
}
})


function createCard(name, image, likes, id) {
  let div1 = document.querySelector("#toy-collection")
  let div = document.createElement("div");
  div.setAttribute("cardId", id)
  div.classList.add("card")
  let h2 = document.createElement("h2")
  h2.innerText = name 
  let img = document.createElement("img")
  img.classList.add("toy-avatar")
  img.setAttribute("src", image)
  let p = document.createElement("p")
  p.innerText = likes 
  let buttonDel = document.createElement("button")
  buttonDel.innerText = "DELETE me ):"
  buttonDel.addEventListener("click", function() {
    div.remove()
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE"
    })
  })



  let button = document.createElement("button")
  button.className = "like-btn"
  button.innerText = "Like <3"
  button.addEventListener("click", function(e) {
    p.innerText = ++ e.target.value
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: e.target.value 
      })
    })

  })


  div.append(h2, img, p, button, buttonDel)
  div1.append(div)
}


let form = document.querySelector(".add-toy-form")
form.addEventListener("submit", function(e) {
  e.preventDefault()
  let name = document.querySelector("#a").value
  let image = document.querySelector("#b").value
  
  fetch("http://localhost:3000/toys", configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      likes: 0,
      name: name,
      image: image
    })
  })
  .then(function(response) {
    return response.json()
  })
  .then(function(json) {
    createCard(json.name, json.image, `${json.likes} likes`)
  })
  form.reset()
})
