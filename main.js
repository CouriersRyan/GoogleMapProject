 var map;
 var lastInput;
 var panorama;
 var sv;
      function initMap() {
      	//Earthquake cluster & search
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat:36.778, lng:-119.417},
          zoom: 8
        });
        var script = document.createElement("script");
        script.src = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp";
        document.getElementsByTagName("head")[0].appendChild(script);
         var geocoder = new google.maps.Geocoder();
        document.getElementById('runMap').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
        });
        document.getElementById('toggleMap').addEventListener('click', function(){
        	toggleMap();
        })
        document.getElementById('randomLocation').addEventListener('click', function(){
        	getRandom();
        })
       
      }

      function processSVData(data, status){
      	console.log(status)
      		console.log(data)
      	if (status === 'ok'){
      		var marker = new google.maps.Marker({
      			position: data.location.latLng,
      			map: map
      		})
      		panorama.setPano(data.location.pano);
      		panorama.setPov({
      			heading: 270,
      			pitch: 0
      		});
      		panorama.setVisible(true);
      		marker.addListener('click', function(){
      			var markerPanoID = data.location.pano;
      			panorama.setPano(markerPanoID);
      			panorama.setPov({
      				heading: 270,
      				pitch: 0
      			})
      			panorama.setVisible(true);
      		})

      	}else{
      		console.error("Street View Data not found for this location");
      		
      		getRandom();
      	}
      }

      function getRandom(){
        var random = {lat: (Math.random()*25)+24, lng: (Math.random()*-58)-66};
        console.log(random)
      	 sv = new google.maps.StreetViewService();
      	 console.log(sv)
      	 panorama = new google.maps.StreetViewPanorama(document.getElementById('map'));
      	 
      	 sv.getPanorama({location: random, radius: 50}, processSVData);
        
        map = new google.maps.Map("map", {
        	center: random,
        	zoom: 16,
        	streetViewControl : false
        })
        map.setVisible(false);
        
      }

    /*  function toggleMap(){
    var toggle = panorama.getVisible();
    if(toggle == true){
        panorama.setVisible(false);
    } else{
    	panorama.setVisible(true);
    }

  }*/

     /* function geocodeAddress(geocoder, map){
      	var address = document.getElementById('input').value;
      	lastInput = address;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
            });
            panorama = new google.maps.StreetViewPanorama(
        	document.getElementById("map"),
        	{
        		position: results[0].geometry.location,
        		pov: {
        			heading: 34,
        			pitch: 10
        		}
        	}
        );
 
        map.setStreetView(panorama);
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }*/
     /* function earthquakeMap(){
      	map = new google.maps.Map(document.getElementById('map'), {
      		zoom: 2,
      		center: new gooogle.maps.LatLng(2.8, -187.3),
      		mapTypeId: 'terrain'
      	});
      	var address = lastInput;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
            });
           }
      else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    })
        
      }*/
/*window.eqfeed_callback = function(results){
	for(var i = 0; i < results.features.length; i++){
		var coords = results.features[i].geometry.coordinates;
		var latLng = new google.maps.LatLng(coords[1], coords[0]);
		var marker = new google.maps.Marker({
			position : latLng,
			map: map
		});
	}
}*/