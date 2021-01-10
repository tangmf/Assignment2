/* LTA DataMall API settings */
var settings = {
    "url": "https://cors-anywhere.herokuapp.com/http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "AccountKey": "4wI0kpClSgyt5mBKBfmEIQ==",
      "accept": "application/json"
    },
  };
  
  /* Mapbox API token */
  mapboxgl.accessToken = 'pk.eyJ1IjoidGFuZ21pbmdmZW5nIiwiYSI6ImNrajQyazEwYzBpeWkyemxseDB6MXk2d24ifQ.I36uKUemWbTsCzrKk_SmHQ';
  
  /* Document Ready */
  $(document).ready(function () {
    /* Hide Loading text on ready*/
    $("#loading").hide();
    $("#toggle-footer-closed").hide();
    $("#settings-bar").hide();
  
    /* Start searching for closest car parks */
    start();
  
  
    /* Display car parks and locations on map */
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation,
      {
        enableHighAccuracy: true
      });
  
      $("#form-toggle").click(function () {
        $("#settings-bar").toggle();
      });
  
      $("#search").click(function () {
      event.preventDefault();
      start();
      });
  
  });
  
  
  function start() {
    /* When searching starts, loading text will be shown */
    $("#loading").show();
    var slider = document.getElementById("range");
    var output = document.getElementById("output");
    output.innerHTML = slider.value + " degrees"; // Display the default slider value
  
    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
      output.innerHTML = this.value + " degrees";
    };
    $.ajax(settings).done(function (response) {
  
      let data = response;
  
      $("#result").empty();
      $('#result').append('<tr><th>Car Park ID</th><th>Development</th><th>Lot type</th><th>Available lots</th><th>Location</th></tr>');
  
      /* list to store info of carparks that meet all the criteria. */
      var locationlist = [];
  
      /* lottype list. Only checked lottypes will be displayed. When lottype is checked, it is added to typelist. In the for loop, if the carpark's lottype is in the list, and meets the other criteria, it will be outputted. */
      var typelist = [];
      if (document.getElementById("c").checked) {
        typelist.push("C");
      }
      if (document.getElementById("l").checked) {
        typelist.push("L");
      }
      if (document.getElementById("y").checked) {
        typelist.push("Y");
      }
      if (document.getElementById("h").checked) {
        typelist.push("H");
      }
  
      /* Availability settings */
      var availability;
      if (document.getElementById("all").checked){
        availability = -1;
      }
      else if (document.getElementById("available").checked){
        availability = 0;
      }
  
      /* Count for number of carparks outputted */
      let count = 0;
      /* Loop through all carparks in API to find carparks based on users input*/
      var i;
      /* found variable is to let me know if there is an output based on the users input. If there is no output, tell user that there are no results. */
      var found = false;
      for (i = 0; i < data.value.length; i++) {
        /* Split location into long and lat */
        let location = data.value[i].Location;
        location = location.split(" ");
        let lat = location[0];
        let long = location[1];
  
        /* Get input from range=settings slider */
        let range = output.innerHTML;
        /* deg variable, which is the lng lat range to find nearest carparks */
        let deg = range.split(" ")[0] / 100;
        /* Finding for car parks that meet the criteria */
        if (Math.abs(lat - parseFloat($("#currentlat").text())) <= deg && Math.abs(long - parseFloat($("#currentlong").text())) <= deg && typelist.includes(data.value[i].LotType ) && data.value[i].AvailableLots > availability) { 
          count += 1;
          /* Display the car parks that meet criteria */
          $("#result").append("<tr><td>" + data.value[i].CarParkID + "</td><td>" + data.value[i].Development + "</td><td>" + data.value[i].LotType + "</td><td>" + data.value[i].AvailableLots + "</td><td>" + long + "," + lat + "</td></tr>");
          /* When there are carparks that meet criteria, so no need to tell user that there are no results */
          found = true;
          /* Add carpark that meets criteria to list to be put into localstorage and used by mapbox api */
          locationlist.push(data.value[i].Location + " " + data.value[i].CarParkID + " " + data.value[i].LotType + " " + data.value[i].AvailableLots);
        }
      }
      /* No results meet criteria */
      if (found === false) {
        $("#result").append("<tr><td>No carparks nearby</td></tr>");
      }
      /* Reset the list */
      typelist = [];
      /* Save carpark informations to local storage to be accessed by mapbox api */
      localStorage.setItem("locations", JSON.stringify(locationlist));
  
      /* Setup the map with data from localstorage */
      navigator.geolocation.getCurrentPosition(successLocation, errorLocation,
        {
          enableHighAccuracy: true
        })
  
        /* Loading is over, loading text is hidden */
      $("#loading").hide();
      $("#output-count").text("Results: " + `${count}`);
  
    });
    
  }
  
  
  
  /* ----------------------------- MAPBOX FUNCTIONS ---------------------------- */
  /* Most code obtained from https://www.youtube.com/watch?v=OySigNMXOZU */
  function successLocation(position) {
    setupMap([position.coords.longitude, position.coords.latitude]);
    $("#notice").hide();
  
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
    });
    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav);
  
    var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken
    });
  
    map.addControl(directions, 'top-left');
  
    var marker = new mapboxgl.Marker({ color: 'red' })
      .setLngLat(center)
      .addTo(map);
  
    /* retrieve location information to add markers and popups */
    var storedLocations = JSON.parse(localStorage.getItem("locations"));
  
    let i = 0;
    /* loop through carparks in localstorage */
    for (i = 0; i < storedLocations.length; i++) {
      storedLocations[i] = storedLocations[i].split(" ");
      /* Add popup */
      var popup = new mapboxgl.Popup()
        .setLngLat([storedLocations[i][1], storedLocations[i][0]])
        .setHTML(`<div id = "popup"><h3>${storedLocations[i][2]}</h3><p style=\"text-align: Left;\"><u>Location:</u>${storedLocations[i][1]},${storedLocations[i][0]}<br><u>LotType:</u> ${storedLocations[i][3]}<br><u>Available Lots:</u> ${storedLocations[i][4]}</div>`)
        .addTo(map);
        /* Add marker */
      var marker = new mapboxgl.Marker()
        .setLngLat([storedLocations[i][1], storedLocations[i][0]])
        .addTo(map);
    }
  
  
  }
  
