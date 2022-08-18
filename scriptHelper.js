// Write your helper functions here!
try {
require('isomorphic-fetch');
} catch (e) {
 //do nothing
}

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   let missionTarget = document.getElementById("missionTarget");
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
        return 'Empty';
    } else if (!isNaN(Number(testInput))) {
        //is a number
        //alert("it's a number");
        return 'IsANumber';
    } else {
        //is Not a number
        return 'NotANumber';
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
    if (validateInput(pilot) === 'Empty' || 
        validateInput(copilot) === 'Empty' || 
        validateInput(fuelLevel) === 'Empty' ||
        validateInput(cargoLvl) === 'Empty') {
            alert("All input fields are required!");

    } else if (validateInput(pilot) === 'IsANumber' || validateInput(copilot) === 'IsANumber') {
            alert("Do not enter numbers for Pilot Name or Co-pilot Name.");

    } else if (validateInput(fuelLevel) === 'NotANumber' || 
        validateInput(cargoLvl) === 'NotANumber') {
            //alert(isNaN("Cargo Mass" + validateInput(cargoLvl)));
            alert("Input numbers only for Fuel Level or Cargo Mass.");
    } //end of validate field
    else {   //display after validation
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
    
        //Updating Shuttle Requirements
        if (fuelLevel < 10000) {
            list.style.visibility = 'visible';
            fuelStatus.innerHTML = "Fuel Level not enough for journey";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = 'red';
        } else {
            list.style.visibility = 'visible';
            fuelStatus.innerHTML = "Fuel level high enough for launch";   
        }
        if (cargoLvl > 10000) {
            list.style.visibility = 'visible';
            cargoStatus.innerHTML = "Cargo Mass too much for takeoff";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = 'red';
        } else { //*correct refresh after initial display
             list.style.visibility = 'visible';
             cargoStatus.innerHTML = "Cargo mass low enough for launch";
        }
        if (fuelLevel > 10000 && cargoLvl < 10000) {
            list.style.visibility = 'visible';
            launchStatus.innerHTML = "Shuttle ready for launch";
            launchStatus.style.color = 'green';
        }
    }      
}    
//Fetching Planetary Data
//myFetch() has some of the code necessary for fetching planetary JSON, however, it is not complete. You need to add the URL and return response.json(). 27.1.1
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
