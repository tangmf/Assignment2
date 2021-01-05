
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
    var typelist = []

    var i;
    var found = false;

    if (document.getElementById("c").checked){
        typelist.push("C");
      }
      if (document.getElementById("l").checked){
        typelist.push("L");
      }
      if (document.getElementById("y").checked){
        typelist.push("Y");
      }
      if (document.getElementById("h").checked){
        typelist.push("H");
      }
    for(i=0;i<data.value.length;i++){
      let location = data.value[i].Location
      location = location.split(" ");
      let lat = location[0];
      let long = location[1];

      let range = output.innerHTML;
      let deg = range.split(" ")[0]/300;

      
      
      
      var lottype = document.getElementById("lottype-settings");
      lottype.oninput = function() {
        start();
        

      
      
      }
      
      
      if (Math.abs(lat - parseFloat($("#currentlat").text())) <= deg && Math.abs(long - parseFloat($("#currentlong").text())) <= deg && typelist.includes(data.value[i].LotType)) {
        
        $("#result").append("<tr><td>" + data.value[i].CarParkID + "</td><td>" + data.value[i].Development + "</td><td>" + data.value[i].LotType + "</td><td>" + data.value[i].AvailableLots + "</td><td>" + long +"," + lat + "</td></tr>")
        found = true;


        locationlist.push(data.value[i].Location + " " + data.value[i].CarParkID + " " + data.value[i].LotType + " " + data.value[i].AvailableLots)
        

        
        
      }
      

      

    }
    if (found == false){
        $("#result").append("<tr><td>No carparks nearby</td></tr>")
        
      }

  var typelist = []
  
  
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

  var marker = new mapboxgl.Marker({color: 'red'})
.setLngLat(center)
.addTo(map);


var storedLocations = JSON.parse(localStorage.getItem("locations"));

let i = 0;
for (i=0;i<storedLocations.length;i++){
  storedLocations[i] = storedLocations[i].split(" ")
  var popup = new mapboxgl.Popup()
  .setLngLat([storedLocations[i][1],storedLocations[i][0]])
  .setHTML(`<h3>${storedLocations[i][2]}</h3><p style=\"text-align: Left;\"><u>Location:</u>${storedLocations[i][1]},${storedLocations[i][0]}<br><u>LotType:</u> ${storedLocations[i][3]}<br><u>Available Lots:</u> ${storedLocations[i][4]}`)
  .addTo(map);
  var marker = new mapboxgl.Marker()
.setLngLat([storedLocations[i][1],storedLocations[i][0]])
.addTo(map);
}


}
