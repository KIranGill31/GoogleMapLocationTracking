
$(document).ready(function($)
{
	ZOHO.embeddedApp.on("PageLoad",function(data)
	{
		if(data && data.Entity)
		{
			currentProjectId = data.EntityId;
			var func_name = "fetchMapMarkers";
			var req_data = {};
			console.log(window.location.href);
			ZOHO.CRM.FUNCTIONS.execute(func_name, req_data).then(function(data1){
				locations = JSON.parse("["+data1["details"]["output"]+"]");
				initMap(locations);
			});	
		}
	})
	ZOHO.embeddedApp.init();
});

function locLoader(item, index){
	console.log("Item is " + item["Name"]);
}

function initMap(locat) {
	  var center = {lat:  parseFloat(locat[0]["Latitude"]), lng: parseFloat(locat[0]["Longitude"])};
	  var locations = [];
	  for(var inx=0; inx < locat.length; inx++)
	  {
		  var locInfo = [];
		  var name = locat[inx]["Name"];
		  var color = locat[inx]["color"];
		  var lat =  parseFloat(locat[inx]["Latitude"]);
		  var lng = parseFloat(locat[inx]["Longitude"]);
		  console.log("name" + name + "lat" + lat + "lng" + lng);
		  locInfo.push(name , lat , lng , color);
		  locations.push(locInfo);
	  }
	  
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 9,
		center: center
	  });
	var infowindow =  new google.maps.InfoWindow({});
	var marker, count;
	for (count = 0; count < locations.length; count++) {
		marker = new google.maps.Marker({
		  position: new google.maps.LatLng(locations[count][1], locations[count][2]),
		  map: map,
		  title: locations[count][0],
		  icon: { url: "http://maps.google.com/mapfiles/ms/icons/"+ locations[count][3] +"-dot.png" }
		});
	google.maps.event.addListener(marker, 'click', (function (marker, count) {
		  return function () {
			infowindow.setContent(locations[count][0]);
			infowindow.open(map, marker);
		  }
		})(marker, count));
	  }
	}