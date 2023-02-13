const brewAPI = "https://api.openbrewerydb.org/breweries";
const listContainer = document.querySelectorAll('.brew_list');
const byId = (id) => document.getElementById(id);

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

};

