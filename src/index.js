const brewAPI = "https://api.openbrewerydb.org/breweries/random?size=11";
const newBrewAPI = "http://localhost:3000/breweries"
const listContainer = document.querySelector('#brewery_list');
const upvote = document.querySelector('#dotd_like');
const downvote = document.querySelector('#dotd_dislike');
let rating = document.querySelector('#dotd_rating');
const addBtn = document.querySelector('#add_button');

fetch(brewAPI)
 .then(res => res.json())
 .then(breweries => oneBrewery(breweries))

 fetch(newBrewAPI)
.then(resp => resp.json())
.then(breweries => oneBrewery(breweries))

 //iterates through the breweries array
 function oneBrewery(breweries) {
    breweries.forEach(listBreweries);
 } function listBreweries(brewery) {
    const breweryName = document.createElement('li');
    breweryName.innerText = brewery.name;
    breweryName.addEventListener('click', () => breweryDetails(brewery));
    listContainer.appendChild(breweryName);
}
function breweryDetails(brewery) {
    const breweryName = document.querySelector('.brewery_name')
    const breweryType = document.querySelector('#brewery_type')
    const breweryAddress = document.querySelector('.brewery_location')
    const breweryWebsite = document.querySelector('.brewery_website')
    const breweryLink = document.querySelector('.brewery_link')

    breweryName.innerText = `Name: ${brewery.name}`
    breweryType.innerText = `Type: ${brewery.brewery_type}`;
    breweryAddress.innerText = `Location: ${brewery.city}, ${brewery.state}`;
    breweryWebsite.innerText = `Link:${brewery.website_url}`;

      //removes the "Link: NULL" if theres no link
      if(brewery.website_url == null) {
        breweryWebsite.innerText = "";
    } else {
        breweryWebsite.innerText = `Link: ${brewery.website_url}`;
    }
    
    breweryLink.href = brewery.website_url;
//map stuff//
    const breweryMap = document.querySelector('#scaled-frame')
    breweryMap.src=(`https://plus.codes/${brewery.latitude},${brewery.longitude}`)
    };
/////////////////////////
//DOTD stuff//
/////////////////////////
const randomId = Math.floor(1 + Math.random() * 11);
const drinkOfTheDay = `http://localhost:3000/dotd/${randomId}`

fetch(drinkOfTheDay)
.then(res => res.json())
.then(drink => renderDotdItem(drink))

function renderDotdItem(drink) {
    let drinkName = document.querySelector('#dotd_name');
    let drinkImg = document.querySelector('#dotd_image');
    let drinkLikes = document.querySelector('#dotd_rating');
    let nbrLikes = drink.likes - drink.dislikes;
    

    drinkName.innerText = drink.name;
    drinkImg.src = drink.img;
    drinkLikes.innerText = `Votes: ${nbrLikes}`;

    upvote.addEventListener ('click', () => {
        drink.likes +=1;
        nbrLikes +=1;
        drinkLikes.textContent = `Votes: ${nbrLikes}`
        downvote.disabled = true;
        upvote.disabled = true;

        fetch(drinkOfTheDay, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({likes: drink.likes})
            })
     })
    
     downvote.addEventListener ('click', () => {
        drink.dislikes +=1;
        nbrLikes -=1;
        drinkLikes.textContent = `Votes: ${nbrLikes}`;
        downvote.disabled = true;
        upvote.disabled = true;

        fetch(drinkOfTheDay, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({dislikes: drink.dislikes})
        })

     })
};
//light mode toggle
const lightDark = document.querySelector("#colorScheme");
function btnToggle() {
    const stylesheet = document.querySelector('#theme_toggle')
    if(lightDark.innerHTML == "🌙"){
        lightDark.textContent = "☀️";
        stylesheet.setAttribute("data-bs-theme", "light")
    } else if(lightDark.innerHTML=="☀️"){
        lightDark.textContent = "🌙";
        stylesheet.setAttribute("data-bs-theme", "dark")
    }
}

//form stuff
function createBrewery(brewery) {
    fetch(newBrewAPI, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
      },
      body: JSON.stringify({
          "name": brewery.name,
          "brewery_type": brewery.brewery_type,
          "city": brewery.city,
          "state": brewery.state,
          "website_url": brewery.website_url,
      })
  })
}


const submitForm = document.getElementById("add_brewery_form");
submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const brewery = {
      name: e.target.brewName.value,
      brewery_type: e.target.brewType.value,
      city: e.target.city.value,
      state: e.target.state.value,
      website_url: e.target.link.value,
  };

  createBrewery(brewery);
  listBreweries(brewery);
  e.target.reset();
  console.log("brewery")

});