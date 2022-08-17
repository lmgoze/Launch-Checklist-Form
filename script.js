// Write your JavaScript code here!

window.addEventListener("load", function() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (event)=>{
        event.preventDefault();
        //Launch Status Check for updating shuttle requirements
        let list = document.getElementById('faultyItems');
        let pilot = document.querySelector("input[name=pilotName]").value;
        let copilot = document.querySelector("input[name=copilotName]").value;
        let fuelLevel = document.querySelector("input[name=fuelLevel]").value;
        let cargoLvl = document.querySelector("input[name=cargoMass]").value;
        
        
        formSubmission(document, list, pilot, copilot, fuelLevel, cargoLvl);
        //event.preventDefault();
    })

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();

   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       //console.log(listedPlanets);
   }).then(function () {
       //console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       /* Example from list
       "name": "Tatooine",
       "diameter": "10465 km",
       "star": "Tatoo I & Tatoo II",
       "distance": "43000 light years from galactic core",
       "image": "https://www.nasa.gov/sites/default/files/images/587837main_Kepler16_transit_art2_full.jpg",
       "moons": 3 */
       let planet = pickPlanet(listedPlanets);
       let name = planet.name;
       let diameter = planet.diameter;
       let star = planet.star;
       let distance = planet.distance;
       let moons = planet.moons;
       let imageUrl = planet.image;
       addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl);
   })
   
});