mapboxgl.accessToken = 'pk.eyJ1IjoidGFuZ21pbmdmZW5nIiwiYSI6ImNrajQyazEwYzBpeWkyemxseDB6MXk2d24ifQ.I36uKUemWbTsCzrKk_SmHQ';

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



  var marker = new mapboxgl.Marker()
  .setLngLat(center)
  .addTo(map);


}



let url = "response.json";



fetch(url)
  .then(response => response.json())
  .then(function (data) {
    var locationlist = []

    var i;
    var found = false;
    for(i=0;i<data.value.length;i++){
      let location = data.value[i].Location
      location = location.split(" ");
      let lat = location[0];
      let long = location[1];


      if (Math.abs(lat - parseFloat($("#currentlat").text())) <= 0.02 && Math.abs(long - parseFloat($("#currentlong").text())) <= 0.02) {
        console.log(JSON.stringify(data.value[i]))
        $("#result").append("<tr><td>" + data.value[i].CarParkID + "</td><td>" + data.value[i].Development + "</td><td>" + data.value[i].LotType + "</td><td>" + data.value[i].AvailableLots + "</td><td>" + long +"," + lat + "</td></tr>")
        found = true;


        locationlist.push(data.value[i].Location)

        
        
      }

      

    }
    if (found == false){
        $("#result").append("<tr><td>No carparks nearby</td></tr>")
        
      }
  
  
  


})


