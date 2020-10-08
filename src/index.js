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



//Isolate elements we need to add stuff to 
let toyDiv = document.querySelector('#toy-collection');
let addToyForm = document.querySelector(".add-toy-form")


//Create cards for every toy in db
fetch("http://localhost:3000/toys")
.then( res => res.json())
.then(function(json){
  createCard(json)
})


//adds listener to new toy form to create a new toy 
addToyForm.addEventListener('submit',function(e){
  e.preventDefault;
  let toyUrl = addToyForm.children[3].value;
  let toyName = addToyForm.children[1].value;
  postToy(toyName,toyUrl);
})


//creates a card for each toy in the json that it's passed
function createCard(json){
  for (i=0;i<json.length;i++){
    //create components
    let div = document.createElement('div')
    let h2 = document.createElement('h2')
    let img = document.createElement('img')
    let p = document.createElement('p')
    let button = document.createElement('button')
    
    //assign values
    div.classList = 'card'

    h2.textContent = json[i].name

    img.src = json[i].image
    img.classList = 'toy-avatar'

    p.textContent = `${json[i].likes} Likes`
    p.id = `${json[i].likes}`

    button.setAttribute('class', 'like-btn')
    button.setAttribute('id', json[i].id)
    button.innerText = "like"
    button.addEventListener('click',function(e){
      e.preventDefault();
      addLike(e);
    })

    //assemble components and append to body
    div.append(h2,img,p,button)
    toyDiv.append(div)
  }
}


//post the new toy to the server, then create its card
function postToy(name,url){
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify({
      "name":name,
      "image":url,
      "likes":0
    })
  })
  .then(res => res.json())
  .then(function(json){
    createCard(json);
  })
  .catch(function(){
    alert("Couldn't add toy")
  })
}


//sends patch to specific object, incremeneting likes by 1 
//on successful patch, changes the DOM to reflect likes in db 
function addLike(e){
  let addOne = parseInt(e.target.previousElementSibling.id) + 1
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": addOne
    })
  })

  .then(res => res.json())

  .then(function(json){
    e.target.previousElementSibling.innerText = `${json.likes} Likes`;
    e.target.previousElementSibling.id = addOne
  })
}