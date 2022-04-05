



// Set api token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FjaGE5NyIsImEiOiJjbDEyZmt3NmMyaTVxM2NrYjExZm54M3JqIn0.koU8783mxqXKz4-8b70rVA';

// Initialate map
var map = new mapboxgl.Map(
  {
    container: 'map',
    style: 'mapbox://styles/sacha97/cl1lwabdl001h14mhlnabhm6x',
    center: [4.49279, 52.14426], // starting position
    zoom: 11 // starting zoom
  }
);


map.on('load', function () {
  // laad een extern bestand
  map.loadImage('https://upload.wikimedia.org/wikipedia/commons/6/63/SpaceX-InterplanetarySpaceship-back_quarter_view-transparency.png', function (error, image) {

      // voeg image toe
      map.addImage('ship', image);

      // defineer een punt in het geheugen
      map.addSource('point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [4.49279, 52.14426]
            }
          }]
        }
      });

      // plak de nieuwe source 'point' op de kaart in een eigen layer
      map.addLayer({
        id: 'points',
        type: 'symbol',
        source: 'point',
        layout: {
          'icon-image': 'ship',
          'icon-size': 0.1
        }
      });
    }
  );
});


function getAPIdata() {

	// cunstruct request
	var city = document.getElementById('city').value;
	var request = 'https://api.openweathermap.org/data/2.5/weather?appid=d9f4694f1946b24dd228f62964c02f25&q='+city+'&units=metric';
	

	// get current weather
	fetch(request)	
	
	// parse response to JSON format
	.then(function(response) {
		return response.json();
	})
	
	// do something with response
	.then(function(response) {
		// show full JSON object
		console.log(response);
		var weatherBox = document.getElementById('weather');
		weatherBox.innerHTML = "Bewolking " + response.clouds.all + "% <br>" + response.main.feels_like + "&#176;C <br>" + response.name;
	})

	.catch(function(error){
		console.log("Hey oelewapperr");
		document.getElementById("weather").classList.add('hidden');
	});
}

document.getElementById('cityButton').onclick = function(){
	getAPIdata();
};










