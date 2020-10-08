let addToy = false;
//this makes sure that none of the event listeners start until the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  //This just hides the form or shows it after you hit add new toy
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
    
  });
    
  //This is the event listener for the add new toy form 
  const form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", function(e){
    e.preventDefault()
    const newName = document.querySelector("#name").value;
    const newImage = document.querySelector("#image").value;
    postToy(newName, newImage)

    //.then(createToys(newName, newImage))
    
    form.reset();  //resets the forms values to blank 
  })

  //this is the fetch request to load all current toys in the database
  //after loading and turning the data into json, it goes through the for loop
  //every toy is individually passed through the createToys method
  fetch('http://localhost:3000/toys')
  .then(resp=>resp.json())
  .then(function(data){
    for(let toy of data){
    createToys(toy)
    }
  })
});

//the postToy method adds new toys to the database
//this ensures all new toys will be there after a page refresh
//this is only called after hitting submit on the new toy form
function postToy(name, image, likes = 0){
  return fetch('http://localhost:3000/toys', {
  method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: likes
      })}).then(resp=>resp.json())
      .then(data=>createToys(data))
}

 /* The createToys function is what shows the display of every toy in the 
 database. If a new toy is added through the form, they only go through this 
 function after getting a succesfull 200 code saying its been saved in
 the db */
function createToys(toy){
    let name = toy.name
    let image = toy.image
    let likes = toy.likes
    let id = toy.id
    let area = document.querySelector("#toy-collection")
    let div = document.createElement('div')
    div.className = "card"
    area.append(div)
    let h = document.createElement('h2')
    h.innerText = name
    let img = document.createElement('img')
    img.className = "toy-avatar"
    img.src = `${image}`
    let p = document.createElement('p')
    p.innerText = `${likes} Likes`
    let btn = document.createElement('button')
    btn.class = "like-button"
    btn.innerText = "Like <3"

    
    div.append(h, img, p, btn)
  
    btn.addEventListener("click", function(){
      let likesNew = likes + 1
      let pNew = `${likesNew} Likes`
     console.log(p)
      // console.log(pNew)
      fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          p: pNew,
          likes: likesNew
        })
      })
      .then(function(res){
        return res.json()
      })
      .then(function(data){
        likes = data.likes
        p.innerText = data.p
      })
      
    })
    
  }