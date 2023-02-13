const brewAPI = "https://api.openbrewerydb.org/breweries";
const listContainer = document.querySelectorAll('.brew_list');
const byId = (id) => document.getElementById(id);
const upvote = document.querySelector('.dotd_like');
const downvote = document.querySelector('.dotd_dislike');
let rating = document.querySelector('.count');

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
    //listContainer.appendChild(breweryName);
}

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
 
upvote.addEventListener ('click', () => {
   console.log('upvote clicked');
   parseInt.rating +=1;
}) 
downvote.addEventListener ('click', () => {
    downvoteDOTD();
})
// function downvoteDOTD(

// function upvoteDOTD();

console.log(upvote)