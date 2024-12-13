// let newYorkCoords = [40.73, -74.0059];
// let mapZoomLevel = 12;
let bikelayer = L.layerGroup()
// Create the createMap function.
function createMap() {

  // Create the tile layer that will be the background of our map.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  
  // Create a baseMaps object to hold the lightmap layer.
  let baseMaps = {
    "Street": street,
  };


  // Create an overlayMaps object to hold the bikeStations layer.
  let overlayMaps  = {
    "Bike stations": bikelayer,
  };

  // Create the map object with options.
  let myMap = L.map("map-id", {
    center:[40.73, -74.0059],
    zoom: 12,
    layers: [street, bikelayer],
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);
};



  // Create the createMarkers function.
function createMarker(response) {
  // Pull the "stations" property from response.data.
  let stations = response.data.stations;
  // Initialize an array to hold the bike markers.
  // let bikeMarkers = [];
  // Loop through the stations array.
  for (let i = 0; i < stations.length; i++){
    let station = stations[i];
      // For each station, create a marker, and bind a popup with the station's name.
      // Add the marker to the bikeMarkers array.
    let bikeMarker = L.marker([station.lat, station.lon])
      .bindPopup(`<h1>${station.name}</h1><h2>Capcity: ${station.capacity}</h2>`);
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
      bikelayer.addLayer(bikeMarker);
  }
};
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json")
  .then(function(response) {
    createMarker(response);
    createMap();
  })