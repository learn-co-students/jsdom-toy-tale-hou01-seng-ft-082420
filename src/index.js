let addToy = false;
//STEP ONE -  set API/URL to variable
let toyURL = 'http://localhost:3000/toys'

document.addEventListener("DOMContentLoaded", () => {

  //STEP TWO - create constant for collection and console log all consts
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection")
  // console.log(addBtn, toyFormContainer, toyCollection)

  //STEP SEVEN - use browser to find form class and creat constant for it
  const addToyForm = document.querySelector('.add-toy-form')
  // console.log(addToyForm)  

  // ---------------------------------------------------------------------------------------------------------

  //STEP THREE - fetch API for data as string, then convert string data to json object (an array),
  //then have array iterate through each element of it and invoke rendering function
  fetch(toyURL).then(response => response.json())
  .then(toys => toys.forEach(toy => {renderToy(toy)
  // .then(toys => console.log(toys))
  }))

  // ---------------------------------------------------------------------------------------------------------

  //STEP FOUR - create function to render each array element, taken in as an argument, on browser
  function renderToy(toy) {
    // console.log(toy, toy.name, toy.image, toy.likes)

    //STEP FIVE - create a div card with given attributes and buttons:
    //main divider
    let toyCard = document.createElement('div')
    toyCard.className = "card"
    
    //elements from object (:3000/toys)
    let toyName = document.createElement('h2')
    toyName.innerHTML = toy.name
    
    let toyImage = document.createElement('img')
    toyImage.className = "toy-avatar"
    toyImage.src = toy.image
    
    let toyLikes = document.createElement('p')
    toyLikes.innerHTML = toy.likes
    
    //button
    let toyLikeButton = document.createElement('button')
    toyLikeButton.className = "like-btn"
    toyLikeButton.innerHTML = "Like!"
    // console.log(toyCard, toyName, toyImage, toyLikes, toyLikeButton)

  // ---------------------------------------------------------------------------------------------------------

    //STEP TEN - create event listener for the like button; invoke increaseLike function
    toyLikeButton.addEventListener("click", function() {
      // console.log("test")
      increaseLikes()
    })

    //STEP ELEVEN - create function to increase likes on the front end
    function increaseLikes() {
      newLikes = (parseInt(toyLikes.innerHTML) + 1)
      toyLikes.innerHTML = newLikes
      updateLikes(toy.id, newLikes)
    }

    //STEP TWELVE - create function to update like increase on the back end
    function updateLikes(toyID, likeCount) {
      
      let toyOption = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": likeCount
        })
      }

      //STEP THIRTEEN - create fetch taking in modified URL and intialize object
      fetch(toyURL+"/"+toyID, toyOption)
      .then(response => console.log(response))
      // console.log(toyOption)
    }
  
    // ---------------------------------------------------------------------------------------------------------
  
    //STEP SIX - append 1)attributes to the card, and 2) card to the collection
    toyCard.append(toyName, toyImage, toyLikes, toyLikeButton)
    // console.log(toyCard)
    
    toyCollection.append(toyCard)
    //refresh browser to see cards on screen
  }

  // ---------------------------------------------------------------------------------------------------------

  //STEP EIGHT - add event listener for form, invoke post toy function
  addToyForm.addEventListener("submit", function(e) {
  // console.log("submitted!")
  e.preventDefault()
  let toy = {}
  toy.name = e.target.name.value
  toy.image = e.target.image.value
  postToy(toy)
  });
  
  //STEP NINE - create function that posts toy to the server
  function postToy(toy) {
    //console.log(toy)
    //console.log(e.target, e.target.name.value, e.target.image.value)

  //STEP NINE(B) - define initialize object
    let toyOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy.name,
        "image": toy.image,
        "likes": 0
      })
    }
    // console.log(toyOption)

  //STEP NINE(A) - create fetch taking in url and initializer object;
  //STEP NINE(C) - complete .then statement
  fetch(toyURL, toyOption).then(renderToy(toy))
  // .then(response => console.log(response))
  //fill out form, test console.log for response
  //refresh localhost server to see added form submission
  }
  
  // ---------------------------------------------------------------------------------------------------------
 
  //THIS WAS PROVIDED IN THE LAB
  addBtn.addEventListener("click", () => {
  addToy = !addToy;
  //If addToy is true, show the top panel if it's false hide it
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
  });

});