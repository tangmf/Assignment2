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

  $("#currentlat").text("Latitude: " + `${lat}`);
  $("#currentlong").text("Longitude: " + `${long}`);

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

}


