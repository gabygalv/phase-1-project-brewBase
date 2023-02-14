const brewAPI = "https://api.openbrewerydb.org/breweries/random?size=10";
const listContainer = document.querySelector('.brewery_list');
const upvote = document.querySelector('.dotd_like');
const downvote = document.querySelector('.dotd_dislike');
let rating = document.querySelector('.dotd_rating');
const addBtn = document.querySelector('.add_button');

fetch(brewAPI)
 .then(res => res.json())
 .then(breweries => oneBrewery(breweries))

 //iterates through the breweries array
 function oneBrewery(breweries) {
    breweries.forEach(listBreweries);
 }

 //creates an li for each brewery in the breweries array
 //event listener starts the breweryDetails function
 function listBreweries(brewery) {
    // console.log(brewery);
    const breweryName = document.createElement('li');
    breweryName.innerText = brewery.name;
    // console.log(breweryName);
    breweryName.addEventListener('click', () => breweryDetails(brewery));
    listContainer.appendChild(breweryName);
}

//will fill in when we have a div for brewery details
function breweryDetails(brewery) {
    //  console.log(brewery);
    const breweryName = ''
    const breweryType =''
    const breweryAddress = ''
    const breweryPhone = ''
};

/////////////////////////
//DOTD stuff//
/////////////////////////

//random number for DOTD card
function randomInt(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + min;
}
const randomDotd = randomInt(1, 11);
// console.log(randomDotd)

fetch(`http://localhost:3000/dotd/${randomDotd}`)
.then(res => res.json())
.then(drink => renderDotdItem(drink))

function renderDotdItem(drink) {
    let drinkName = document.querySelector('.dotd_name');
    let drinkImg = document.querySelector('.dotd_image');
    let drinkLikes = document.querySelector('.dotd_rating');
    let nbrLikes = drink.likes - drink.dislikes;
    

    drinkName.innerText = drink.name;
    drinkImg.src = drink.img;
    drinkLikes.innerText = nbrLikes;

    upvote.addEventListener ('click', () => {
        drink.likes +=1;
        nbrLikes +=1;
        drinkLikes.textContent = nbrLikes;
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
        drinkLikes.textContent = nbrLikes;
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


//hide/show form 
//still need to figure out how to start with it hidden
let addBrewery = false;
addBtn.addEventListener("click", () => {
addBrewery = !addBrewery;
const formCont = document.querySelector('.form_container');
if (addBrewery) {
    formCont.style.display = "block";
} else {
    formCont.style.display = "none";
}
});