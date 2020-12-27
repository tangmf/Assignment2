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
        let str = data.value[i].Development
        
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


