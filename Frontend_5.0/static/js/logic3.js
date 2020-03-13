// Creating map object
// List all paths for GeoJSONs
var bostonpath = "static/data/Boston_Neighborhoods.geojson";
var schoolpath = "static/data/colleges2.geojson";
var noisepath = "static/data/Noise2.geojson";
var rodentpath = "static/data/RodentsPerts.geojson";
var trashpath = "static/data/Trash.geojson";

// layers for  different sets of data
var schools = new L.LayerGroup();
var neighborhoods = new L.LayerGroup();
var noise = new L.LayerGroup();
var rodent = new L.LayerGroup();
var trash = new L.LayerGroup();

// SCHOOL MARKERS LAYER
// Grabbing our GeoJSON data for school markers layer..
d3.json(schoolpath, function(schools1) {
  // Creating a GeoJSON layer with the retrieved data
  createMarkers(schools.features);
});
function createMarkers(schoolData) {
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h6>" + feature.properties.Name + "</h6>");
  }
  var schools = L.geoJSON(schoolData, {
    onEachFeature: onEachFeature
  });
  createSchoolMap(schools);
}

// Create the tile layer that will have the school markers
function createSchoolMap(schools) {
  var streetmap = L.tileLayer("https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  d3.json(bostonpath, function(x) {
    // Creating a GeoJSON layer with the retrieved data
    neighborhoods = L.geoJson(x.features);

    // Create overlay object to hold our overlay layer
  var overlayMaps = {
    "Colleges/Universities": schools,
    "Neighborhoods": neighborhoods
  };

  var map = L.map("map", {
    center: [42.3601, -71.0589],
    zoom: 11,
    layers: [streetmap, neighborhoods, schools]
});
  L.control.layers(null, overlayMaps, {collapsed: false}).addTo(map);
});
}
// Grabbing GeoJSON data for Neighborhood division map
// neighborhoods.addTo(map);