

// A. Boston Neighborhoods
//-------------------------------------------------- 
// Adding Neighborhood layer
// var bostonpath = "static/data/Boston_Neighborhoods.geojson";
// d3.json(bostonpath, function(x) {
//   // Creating a GeoJSON layer with the retrieved data
//   neighborhoods = L.geoJson(x.features);
// });

// // Grabbing Neighborhood GeoJSON data..
var link = "static/data/Boston_Neighborhoods.geojson";
var boston = d3.json(link, function(data) {
  console.log("neighborhoods initiated");
  // Creating a GeoJSON layer with the retrieved data
  L.geoJson(data)
  // .addTo(map)
  ;
});

// B. Heatmaps
//-------------------------------------------------- 
// var url1 = "static/data/Noise2.geojson";
// var noise = d3.json(url1, function(response1) {
//   console.log("Noise Heatmap Init");
//   console.log(response1);
//   var main_data = response1.features;
//   var heatArray1 = [];
//   for (var i = 0; i < main_data.length; i++) {
//     var location1 = main_data[i].geometry;
//     if (location1) {
//       heatArray1.push([location1.coordinates[1], location1.coordinates[0]]);
//     }
//   }
//   var heat1 = L.heatLayer(heatArray1, {
//     radius: 20,
//     blur: 10
//   })
//   // .addTo(map);
// });


// var url2 = "static/data/Trash.geojson";
// var heat2 = d3.json(url2, function(response2) {
//   console.log("heatmap_2 initiated");
//   console.log(response2);
//   var main_data2 = response2.features;
//   var heatArray2 = [];
//   for (var i = 0; i < main_data2.length; i++) {
//     var location2 = main_data2[i].geometry;
//     if (location2) {
//       heatArray2.push([location2.coordinates[1], location2.coordinates[0]]);
//     }
//   }
//  L.heatLayer(heatArray2, {
//     radius: 20,
//     blur: 10
//   })
//   // .addTo(map)
//   ;
  
// });

// var url3 = "static/data/RodentsPests.geojson";
// var heat3 = d3.json(url3, function(response3) {
//   console.log("heatmap_3 initiated");
//   console.log(response3);
//   var main_data3 = response3.features;
//   var heatArray3 = [];
//   for (var i = 0; i < main_data3.length; i++) {
//     var location3 = main_data3[i].geometry;
//     if (location3) {
//       heatArray3.push([location3.coordinates[1], location3.coordinates[0]]);
//     }
//   }
//  L.heatLayer(heatArray3, {
//     radius: 20,
//     blur: 10
//   })
//   // .addTo(map)
//   ;
  
// });


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
// var noise = L.layerGroup(heat2);
var neighborhoods = L.layerGroup(boston);


// Create a baseMaps object
var baseMaps = {
  "Street Map": streetmap,
  "Dark Map": darkmap
};

// Create an overlay object
var overlayMaps = {
  // "Noise HeatMap": noise,
  "Neighborhoods": neighborhoods
};

// Define a map object
var map = L.map("map", {
  center: [42.3601, -71.0589],
  zoom: 11,
  layers: [streetmap, 
    // noise,
    neighborhoods
  ]
});

// // Pass our map layers into our layer control
// // Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(map);
