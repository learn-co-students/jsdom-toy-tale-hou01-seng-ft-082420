let addToy = false;
let URLBase = "http://localhost:3000/toys/"

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

  fetch (URLBase).then(res => res.json()).then(toys => toys.forEach(toy => createToyCard(toy)));

  const f = document.querySelector(".add-toy-form")
  f.addEventListener('submit', e => {
    e.preventDefault()
    createNewToy(e.target[0].value, e.target[1].value)
    f.reset()
    //lines 25 and 26 - extra stuff to make form hide again
    toyFormContainer.style.display = "none"
    addToy = !addToy
  })
  //below this line is the last line of the DOM Content Loaded
  
});

const createToyCard = (toy) => {
  let div = document.createElement('div')
  div.setAttribute('class', 'card')

  let h2 = document.createElement('h2')
  h2.innerText = toy.name
  
  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')
  
  let p = document.createElement('p')
  p.innerText = `${toy.likes} Likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = 'Like ❤️'
  btn.addEventListener('click', e => {
    e.preventDefault()

    let likes = parseInt(p.innerText) + 1

    fetch(URLBase + e.target.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        'likes': likes
      })
    })
    .then(res => res.json())
    .then(() => p.innerText = `${likes} Likes`)
  })

  div.append(h2, img, p, btn)

  let col = document.querySelector("#toy-collection");
  col.append(div)

}

const createNewToy = (name, img) => {

  fetch(URLBase, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      'name': name,
      'image': img,
      'likes': 0
    }) 
  })
  .then(res => res.json())
  .then(toy => createToyCard(toy))

}