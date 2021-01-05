


var myHeaders = new Headers();
myHeaders.append("AccountKey", "4wI0kpClSgyt5mBKBfmEIQ==");

var raw = "";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


let url = "response.json";




function start(){

  
  fetch(url)
  .then(response => response.json())
  .then(function (data) {
    $("#result").empty()
        $('#result').append('<tr><th>Car Park ID</th><th>Development</th><th>Lot type</th><th>Available lots</th><th>Location</th></tr>')

    var slider = document.getElementById("range");
    var output = document.getElementById("output");
    output.innerHTML = slider.value + " deg"; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
      output.innerHTML = this.value + " deg";
      start();

    }
    var locationlist = []

    var i;
    var found = false;
    for(i=0;i<data.value.length;i++){
      let location = data.value[i].Location
      location = location.split(" ");
      let lat = location[0];
      let long = location[1];

      let range = output.innerHTML;
      let deg = range.split(" ")[0]/300;
      if (Math.abs(lat - parseFloat($("#currentlat").text())) <= deg && Math.abs(long - parseFloat($("#currentlong").text())) <= deg) {
        
        $("#result").append("<tr><td>" + data.value[i].CarParkID + "</td><td>" + data.value[i].Development + "</td><td>" + data.value[i].LotType + "</td><td>" + data.value[i].AvailableLots + "</td><td>" + long +"," + lat + "</td></tr>")
        found = true;


        locationlist.push(data.value[i].Location)

        
        
      }

      

    }
    if (found == false){
        $("#result").append("<tr><td>No carparks nearby</td></tr>")
        
      }
  
  
  
  localStorage.setItem("locations", JSON.stringify(locationlist));
  navigator.geolocation.getCurrentPosition(successLocation, errorLocation,
  {
    enableHighAccuracy: true
  })

})

}


mapboxgl.accessToken = 'pk.eyJ1IjoidGFuZ21pbmdmZW5nIiwiYSI6ImNrajQyazEwYzBpeWkyemxseDB6MXk2d24ifQ.I36uKUemWbTsCzrKk_SmHQ';

start();
navigator.geolocation.getCurrentPosition(successLocation, errorLocation,
  {
    enableHighAccuracy: true
  })

function successLocation(position) {
  console.log(position)
  setupMap([position.coords.longitude, position.coords.latitude]);
  
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  $("#currentlat").text(`${lat}`);
  $("#currentlong").text(`${long}`);


}

function errorLocation() { }

function setupMap(center) {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: center,
    zoom: 15
  })
  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);

  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
  })

  map.addControl(directions, 'top-left');

  var marker = new mapboxgl.Marker()
.setLngLat(center)
.addTo(map);


var storedLocations = JSON.parse(localStorage.getItem("locations"));

let i = 0;
for (i=0;i<storedLocations.length;i++){
  storedLocations[i] = storedLocations[i].split(" ")
  var marker = new mapboxgl.Marker()
.setLngLat([storedLocations[i][1],storedLocations[i][0]])
.addTo(map);
}


}
