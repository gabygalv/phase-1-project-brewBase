const brewAPI = "https://api.openbrewerydb.org/breweries/random?size=10";
const listContainer = document.querySelector('.brewery_list');
const upvote = document.querySelector('.dotd_like');
const downvote = document.querySelector('.dotd_dislike');
let rating = document.querySelector('.dotd_rating');

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

fetch("http://localhost:3000/dotd/1")
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
        nbrLikes +=1;
        drinkLikes.textContent = nbrLikes;
        downvote.disabled = true;
        upvote.disabled = true;
     })
    
     downvote.addEventListener ('click', () => {
        drink.dislikes +=1;
        nbrLikes -=1;
        drinkLikes.textContent = nbrLikes;
        downvote.disabled = true;
        upvote.disabled = true;
     })
};

 
downvote.addEventListener ('click', () => {
    // downvoteDOTD();
})
// function downvoteDOTD(

// function upvoteDOTD();
