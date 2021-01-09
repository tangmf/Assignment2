var settings = {
    "url": "https://cors-anywhere.herokuapp.com/http://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2?",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "AccountKey": "4wI0kpClSgyt5mBKBfmEIQ==",
      "accept": "application/json"
    },
  };
  
  $(document).ready(function () {
    $("#loading").hide();
    search();
    $("#btn").click(function () {
      search();
    });
  })
  
  function search() {
    $("#loading").toggle();
    $.ajax(settings).done(function (response) {
  
      let data = response
  
      $("#search").empty()
      $('#search').append('<tr><th>Car Park ID</th><th>Development</th><th>Lot type</th><th>Available lots</th><th>Location</th></tr>')
  
  
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
  
  
      var i;
      var found = false;
      for (i = 0; i < data.value.length; i++) {
        let location = data.value[i].Location
        location = location.split(" ");
        let lat = location[0];
        let long = location[1];
        let str = data.value[i].Development;
        if (str.toLowerCase().includes($("#input").val().toLowerCase()) && typelist.includes(data.value[i].LotType ) && data.value[i].AvailableLots > availability) {
          $("#search").append("<tr><td>" + data.value[i].CarParkID + "</td><td>" + data.value[i].Development + "</td><td>" + data.value[i].LotType + "</td><td>" + data.value[i].AvailableLots + "</td><td>" + long + "," + lat + "</td></tr>")
          found = true;
        }
      }
      if (found == false) {
        $("#search").append("<tr><td>No results</td></tr>")
      }
    $("#loading").toggle();
    })
    
  }
  
  /* Using response.json
  let url = "response.json";
  $(document).ready(function(){
    searchbyarea();
    $("#btn").click(function(){
      searchbyarea();
    });
  })
  
  function searchbyarea() {
    fetch(url)
      .then(response => response.json())
      .then(function (data) {
        var locationlist = []
        $("#search").empty()
        $('#search').append('<tr><th>Car Park ID</th><th>Development</th><th>Lot type</th><th>Available lots</th><th>Location</th></tr>')
        var i;
        var found = false;
        for(i=0;i<data.value.length;i++){
          let location = data.value[i].Location
          location = location.split(" ");
          let lat = location[0];
          let long = location[1];
          let str = data.value[i].Development;
          if (str.toLowerCase().includes($("#input").val().toLowerCase())) {
            $("#search").append("<tr><td>" + data.value[i].CarParkID + "</td><td>" + data.value[i].Development + "</td><td>" + data.value[i].LotType + "</td><td>" + data.value[i].AvailableLots + "</td><td>" + long +"," + lat + "</td></tr>")
            found = true;
          }
        }
        if (found == false){
          $("#search").append("<tr><td>No results</td></tr>")       
        }
      });
  }
  */
  
  