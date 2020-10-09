//This is me going through the entire document and writing out
//what is needed, trying to get as specific as I can without writing code


////find div with id "toy-collection"
////on page load, get request for toy objects
//with response, make a <div class="card"> for each toy
//add each card to the toy-collection div
//card:
//h2 el with toy name
//img el with src = image, class = "toy-avatar"
//p el with like count
//button el with class = "like-btn"
//VV example toy card div VV
{/* <div class="card">
<h2>Woody</h2>
<img src=toy_image_url class="toy-avatar" />
<p>4 Likes </p>
<button class="like-btn">Like <3</button>
</div> */}

//Toy Post
//on form submit, toy info is collected into a post
//post is sent to "http://localhost:3000/toys"
//toy should be added to toy-collection
//toy should conditionally render to page
//VV post example VV
let toyOption = {
    method: "POST",
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    
    body: JSON.stringify({
      "name": "Jessie",
      "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
      "likes": 0
    })
    }
    
    //Toy Likes
    //on toys button like click, two things should happen
    //1: conditional increase to toy like count without refresh
    //2: patch sent to "http://localhost:3000/toys/:id" updating number of likes
    //VV example patch VV
    
    // PATCH http://localhost:3000/toys/:id
    // headers: 
    // {
    //   "Content-Type": "application/json",
    //   Accept: "application/json"
    // }
    
    // body: JSON.stringify({
    //   "likes": <new number>
    // })