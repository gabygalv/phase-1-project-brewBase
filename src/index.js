const brewAPI = "https://api.openbrewerydb.org/breweries";
const brewList = document.querySelectorAll('#list_container');
const byId = (id) => document.getElementById(id);

fetch(brewAPI)
 .then(res => res.json())
 .then(breweries => oneBrewery(breweries))

 function oneBrewery(breweries) {
    breweries.forEach(listBreweries);
 }

 function listBreweries(brewery) {
    console.log(brewery);
    const breweryName = document.createElement('h2')
    breweryName.innerText = brewery.name
    console.log(breweryName)
    brewList.appendChild(breweryName);
}

function breweryDetails(brewery) {
    // console.log(brewery);

};

