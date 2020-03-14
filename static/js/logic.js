// Define test map object without layers
// var map = L.map("map", {
//   center: [42.3601, -71.0589],
//   zoom: 11,
//   // layers: [streetmap, 
//   //   noise,
//   //   // neighborhoods
//   // ]
// });



// A. Boston Neighborhoods
//-------------------------------------------------- 
// Adding Neighborhood layer
// var bostonpath = "static/data/Boston_Neighborhoods.geojson";
// d3.json(bostonpath, function(x) {
//   // Creating a GeoJSON layer with the retrieved data
//   neighborhoods = L.geoJson(x.features);
// });

// Grabbing Neighborhood GeoJSON data..
//var link = "static/data/Boston_Neighborhoods.geojson";
var link = window.location.origin.concat("/neighborhoods");
var boston = d3.json(link, function(data) {
  console.log("neighborhoods initiated");
  // Creating a GeoJSON layer with the retrieved data

  // L.geoJSON() returns a layer.  This reference will only exist within this promise.
  var neighborhoods = L.geoJson(data)
  controlLayers.addOverlay(neighborhoods, "Neighborhoods")
  // .addTo(map)
  ;
});


// // SCHOOL MARKERS LAYER
// var schoolpath = "static/data/colleges2.geojson";
// console.log("schools initiated");

// var schools = new L.LayerGroup();
// // Grabbing our GeoJSON data for school markers layer..
// d3.json(schoolpath, function(schools) {
//   // Creating a GeoJSON layer with the retrieved data
//   createMarkers(schools.features);
//   console.log("schools initiated");
//   console.log(schools);

// });
// function createMarkers(schoolData) {
//   function onEachFeature(feature, layer) {
//     layer.bindPopup("<h6>" + feature.properties.Name + "</h6>");
//   }
//   var schools = L.geoJSON(schoolData, {
//     onEachFeature: onEachFeature
//   });
//   createSchoolMap(schools)
//   controlLayers.addOverlay(schools, "Schools")

//   ;
// }



// B. Heatmaps
//-------------------------------------------------- 
//var url1 = "static/data/Noise2.geojson";
var url1 =window.location.origin.concat("/noise");
var heat1= d3.json(url1, function(response1) {
  console.log("Noise Heatmap Init");
  console.log(response1);
  var main_data = response1.features;
  var heatArray1 = [];
  for (var i = 0; i < main_data.length; i++) {
    var location1 = main_data[i].geometry;
    if (location1) {
      heatArray1.push([location1.coordinates[1], location1.coordinates[0]]);
    }
  }
  var heat1 = L.heatLayer(heatArray1, {
    radius: 70,
    blur: 5
  })
  controlLayers.addOverlay(heat1, "Noise")
  // .addTo(map);
});


//var url2 = "static/data/Trash.geojson";
//var url2 = "http://127.0.0.1:5000/trash";
var url2=window.location.origin.concat("/trash");
var heat2 = d3.json(url2, function(response2) {
  console.log("heatmap_2 initiated");
  console.log(response2);
  var main_data2 = response2.features;
  var heatArray2 = [];
  for (var i = 0; i < main_data2.length; i++) {
    var location2 = main_data2[i].geometry;
    if (location2) {
      heatArray2.push([location2.coordinates[1], location2.coordinates[0]]);
    }
  }
  var heat2 = L.heatLayer(heatArray2, {
    radius: 20,
    blur: 10
  })
  controlLayers.addOverlay(heat2, "Trash")
  // .addTo(map)
  ;
  
});

//var url3 = "static/data/RodentsPests.geojson";
var url3 = window.location.origin.concat("/rodents");;
var heat3 = d3.json(url3, function(response3) {
  console.log("heatmap_3 initiated");
  console.log(response3);
  var main_data3 = response3.features;
  var heatArray3 = [];
  for (var i = 0; i < main_data3.length; i++) {
    var location3 = main_data3[i].geometry;
    if (location3) {
      heatArray3.push([location3.coordinates[1], location3.coordinates[0]]);
    }
  }
  var heat3 = L.heatLayer(heatArray3, {
    radius: 20,
    blur: 10
  })
  controlLayers.addOverlay(heat3, "Rodents")

  // .addTo(map)
  ;
  
});


// C. Base Layers
//-------------------------------------------------- 
// Adding tile layer
var streetmap =L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
})
// .addTo(map)
;

// Darkmap Layer
var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});


// D. Map Layers 
//-------------------------------------------------- 
// Create two separate layer groups: one for cities and one for states
// Create a baseMaps object
var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap
};

// Create an overlay object
var overlayMaps = {
  // "Noise HeatMap": noise,
  // "Neighborhoods": neighborhoods
};

// Define a map object
var map = L.map("map", {
  center: [42.3601, -71.0589],
  zoom: 11,
  layers: [streetmap
    // noise
  ]
});

// // Pass our map layers into our layer control
// // Add the layer control to the map
var controlLayers = L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
