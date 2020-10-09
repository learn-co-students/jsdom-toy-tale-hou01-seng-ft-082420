let addToy = false;
let toysUrl =  "http://localhost:3000/toys"
// we have a listener of the DOM to wait  until DOMContent is Loaded 
document.addEventListener("DOMContentLoaded", () => {
  // grabbing show form button
  const addBtn = document.querySelector("#new-toy-btn");
  // grabbing toyFormContainer
  const toyFormContainer = document.querySelector(".container");

  function createNewToy(toy){
      // we want to grab the toyContainer from the DOM
      const toyContainer = document.querySelector('#toy-collection')
      // const tC = document.getElementById('toy-collection')
         // make a div with the class of card 
         const div = document.createElement('div')
         const h2 = document.createElement('h2')
         const img = document.createElement('img')
         const p = document.createElement('p')
         const button = document.createElement('button')
   
         div.className = 'card'
         // div.classList.add('toy')
   
         h2.innerText = toy.name
   
         img.src = toy.image
         img.className =  'toy-avatar'
   
         p.innerText = `${toy.likes} Likes`
   
         button.className = 'like-btn'
         button.innerText = 'like <3'


         button.addEventListener('click', function(){
           console.log('like button has been clicked')
          //  update our DOM
           p.innerText = `${++ toy.likes} Likes`
          // update our server
           fetch(`${toysUrl}/${toy.id}`, {
            method: 'PATCH',
            headers:{
              "Content-Type":'application/json',
              "Accept":'application/json'
            },
            body: JSON.stringify({
              likes: toy.likes
            })
           })
         })
   
         // put h2 to div
         div.append(h2, img, p, button)
   
         toyContainer.append(div) 
  }

  // fetch to get all  Toys
  fetch(toysUrl) 
  .then(function(res){
    // parse our request
    return res.json()  //making sense of our data, .json() returns another promise
  })
  .then(function(data){
     //logging an array here, we can manipulate data here 
    // I want to iterate through array 
    // for every object 
    
    // we want to grab the toyContainer from the DOM
    const toyContainer = document.querySelector('#toy-collection')
    // const tC = document.getElementById('toy-collection')

    // our toy look like this: 
  //   <div class="card">
  //   <h2>Woody</h2>
  //   <img src=toy_image_url class="toy-avatar" />
  //   <p>4 Likes </p>
  //   <button class="like-btn">Like <3</button>
  // </div>

    for(const toy of data){ 
      // console.log(toy)
      // we are in a loop 
      createNewToy(toy)
 

    }

    
  })


  // click to show form
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


  // grab our form
  const newToyForm = document.querySelector('.add-toy-form')
  console.log(newToyForm)
  // add event listener -> listening for a submit 
  newToyForm.addEventListener('submit', function(e){
    e.preventDefault()
    const name = document.querySelector('#name-input').value
    const url = document.querySelector('#image-input').value
    console.log(name, url)
    // when we submit 
    // we want to grab the values of our inputs 

    fetch(toysUrl,{
      method: 'POST',
      headers:{
        "Content-Type": 'application/json',
        "Accept":"application/json"
      },
      body: JSON.stringify({
        name: name,  
        image: url,
        likes: 0
      })
    })
    .then(function(res){
      return res.json()
    })
    .then(function(toy){
   
      // update DOM 
      createNewToy(toy)

    })

  })

}); //end of DOMContentLoaded Event Callback function
