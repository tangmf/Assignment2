/* settings for LTA DataMall API */
var settings = {
    "url": "https://cors-anywhere.herokuapp.com/http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "AccountKey": "4wI0kpClSgyt5mBKBfmEIQ==",
      "accept": "application/json"
    },
  };
  
  /* Document ready */
  $(document).ready(function () {
    /* Hide loading text and options dropdown */
    $("#loading").hide();
    $("#settings-bar").hide();
  
    /* Dropdown toggle button */
    $("#form-toggle").click(function () {
        $("#settings-bar").toggle();
      })
  
    /* Search button */
    search();
    $("#search").click(function () {
      search();
    });
  })
  
  /* Search for carparks based on settings/options selected by user */
  function search() {
    /* show loading text */
    $("#loading").show();
  
    /* Read from LTA DataMall API */
    $.ajax(settings).done(function (response) {
  
      let data = response
      /* Reset table */
      $("#result").empty()
      $('#result').append('<tr><th>Car Park ID</th><th>Development</th><th>Lot type</th><th>Available lots</th><th>Location</th></tr>')
  
      /* List for the lot types. Only those in the list will be displayed*/
      var typelist = []
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
  
      /* Loop through all carparks in the API */
      var i;
      var found = false;
      for (i = 0; i < data.value.length; i++) {
        /* Split location into long and lat */
        let location = data.value[i].Location
        location = location.split(" ");
        let lat = location[0];
        let long = location[1];
        let str = data.value[i].Development;
        /* Make it so that the search function is not case sensitive */
        if (str.toLowerCase().includes($("#input").val().toLowerCase()) && typelist.includes(data.value[i].LotType ) && data.value[i].AvailableLots > availability) {
          /* append to table */
          $("#result").append("<tr><td>" + data.value[i].CarParkID + "</td><td>" + data.value[i].Development + "</td><td>" + data.value[i].LotType + "</td><td>" + data.value[i].AvailableLots + "</td><td>" + long + "," + lat + "</td></tr>")
          found = true;
        }
      }
      /* When there is no output (empty table), the user is informed. */
      if (found == false) {
        $("#result").append("<tr><td>No results</td></tr>")
      }
      /* loading is finished, and output is successfully displayed */
    $("#loading").hide();
    })
    
  }
  
  