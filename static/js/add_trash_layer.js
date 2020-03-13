
function add_trash() {
    //document.getElementById("victoria_trash").innerHTML = "VICTORIA_TRASH"



    console.log("TESTING ***");
    
    var link = "static/js/Trash.geojson";

    console.log(link);
    console.log("TESTING 2!!");

    var map = document.getElementById("map");
    if(map){
        console.log("found map");
    }
    else{
        console.log("did not find map");
    }
    // Grabbing our GeoJSON data..
    d3.json(link, function(data) {
	    // Creating a GeoJSON layer with the retrieved data
	    L.geoJson(data).addTo(map);
    });

    console.log("TESTING 3! ");
 }
