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

fetch ("http://localhost:3000/toys")
.then(function(res){
  return res.json()
})
.then(function(json){
  // console.log("Pizza Planet", json)
  for(const toy of json){
    // console.log(toy.image, toy.name, toy.likes)
    createToyPage(toy.image, toy.name, toy.likes, toy.id)
  }


})

function createToyPage(image, name, likes, id){
  let collection = document.querySelector("#toy-collection")
  let div = document.createElement('div')
  div.className = "card"
  let h2 = document.createElement('h2')
  h2.textContent = name
  let img = document.createElement('img')
  img.src = image
  img.className = "toy-avatar"
  let p = document.createElement('p')
  p.textContent = `Likes ${likes}`
  let likeButton = document.createElement('button')
  likeButton.textContent = "Like"
  likeButton.className = "like-btn"
  
  div.append(h2, img, p, likeButton)
  collection.append(div)
  
  div.setAttribute('toyId', id )

  likeButton.addEventListener('click', function(e){
    console.log("Picture if you will, a like")
    e.preventDefault()
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likes: likes + 1
      })
    })
    .then(function(res){
      return res.json()
    })
    .then(function(data){
      p.innerText = `Likes ${data.likes}`
    })

    // likeButton.reset();
  })
}

const form = document.querySelector('.add-toy-form')
console.log(form)

form.addEventListener('submit', function(e){

  e.preventDefault()
  const name = document.querySelector('input[name="name"]').value
  const image = document.querySelector('input[name="image"]').value
  console.log("Oh hai Mark", name, image)
  // postToy will go here once constructed
  postToy(image, name)
  .then(function(res){
    return res.json()
  })
  .then(function(data){
    console.log(data)
    console.log(data.name, data.image, data.likes)
    createToyPage(data.image, data.name, data.likes, data.id)
  })
  form.reset();
});


function postToy(image, name, likes = 0){
  console.log("ARE WE HERE?!?!")
  return fetch("http://localhost:3000/toys", {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: likes
    })
  })
}
