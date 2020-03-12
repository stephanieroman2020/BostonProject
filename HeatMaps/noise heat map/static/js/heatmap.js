var myMap = L.map("map", {
  center: [42.3601, -71.0589],
  zoom: 13
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var url = "static/data/Noise2.geojson";
d3.json(url, function(response) {
  console.log("response");
  console.log(response);
  var main_data = response.features;
  var heatArray = [];
  for (var i = 0; i < main_data.length; i++) {
    var location = main_data[i].geometry;
    if (location) {
      heatArray.push([location.coordinates[1], location.coordinates[0]]);
    }
  }
  var heat = L.heatLayer(heatArray, {
    radius: 15,
    blur: 25
  }).addTo(myMap);
});











