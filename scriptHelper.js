// Write your helper functions here!
try {
require('isomorphic-fetch');
} catch (e) {
 //do nothing
}

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let missionTarget = document.getElementById('missionTarget');
    missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name:     ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star:     ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons:     ${moons}</li>
                </ol>
                <img src='${imageUrl}'>
                `
} //end of addDestinationInfo

function validateInput(testInput) {
    if (testInput === 0 || testInput === "" || testInput === null) {
        return 'isEmpty';
    } else if (!isNaN(Number(testInput))) {
        //is a number
        //alert("it's a number");
        return 'isANumber';
    } else {
        //is Not a number
        return 'isNotANumber';
    }
} //end of validateInput

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLvl) {
    let launchStatus = document.getElementById("launchStatus");
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");

    //Adding Validation
    //validate if any of the input fields are empty
    if (validateInput(pilot) === 'isEmpty' || 
        validateInput(copilot) === 'isEmpty' || 
        validateInput(fuelLevel) === 'isEmpty' ||
        validateInput(cargoLvl) === 'isEmpty') {
            alert("All input fields are required!");
            //prevent display of Updating Shuttle Requirements
            preventDefault();

    } else if (validateInput(pilot) === 'isANumber' || validateInput(copilot) === 'isANumber') {
            alert("Do not enter numbers for Pilot Name or Co-pilot Name.");

    } else if (validateInput(fuelLevel) === 'isNotANumber' || 
        validateInput(cargoLvl) === 'isNotANumber') {
            //alert(isNaN("Cargo Mass" + validateInput(cargoLvl)));
            alert("Input numbers only for Fuel Level or Cargo Mass.");
    } //end of validate field
        
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    
    //Updating Shuttle Requirements
    if (fuelLevel > 10000 && cargoLvl < 10000) {
        list.style.visibility = 'visible';
        launchStatus.innerHTML = "Shuttle ready for launch";
        // fuelStatus.innerHTML = "Fuel level high enough for launch";
        // cargoStatus.innerHTML = "Cargo mass low enough for launch";
        launchStatus.style.color = `green`;
    } 

    if (fuelLevel < 10000) {
        list.style.visibility = 'visible';
        fuelStatus.innerHTML = "Fuel Level not enough for journey";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = 'red';
    }
    if (cargoLvl > 10000) {
        list.style.visibility = 'visible';
        cargoStatus.innerHTML = "Cargo Mass too much for takeoff";
        launchStatus.innerHTML = "Shuttle not ready for launch";
        launchStatus.style.color = 'red';

     } else if (cargoLvl < 10000) { //*correct refresh after change low fuel/high cargo
        list.style.visibility = 'visible';
        cargoStatus.innerHTML = "Cargo Mass low enough for launch";
    } 
    
}    
//Fetching Planetary Data
//myFetch() has some of the code necessary for fetching planetary JSON, however, it is not complete. You need to add the URL and return response.json().
async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
    });

    return planetsReturned;
}
//pickPlanet() takes in one argument: a list of planets. Using Math.random(), return one planet from the list with a randomly-selected index. Ch12.6.1
function pickPlanet(planets) {
    let randoIndex = Math.floor(Math.random() * planets.length);
    return planets[randoIndex];
}

try {
module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
} catch (e) {
 //do nothing
}
