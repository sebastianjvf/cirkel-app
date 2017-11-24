/* REQUEST THE GEO LOCATION */
(function() {
	
	// Onload
	window.addEventListener('load', function(event) {
		
		// Check for support
		if (navigator.geolocation) {
		  console.log('Geolocation is supported!')
		  
		  makeLocationCall();
		  
		} else {
		  console.log('Geolocation is not supported for this Browser/OS.');
		}
		
	});
	
	// Updates the current location
	function makeLocationCall() {
		let startPos;
		
		// Get the divs to display the information
		let latitudeDiv = document.getElementById('latitude');
		let longitudeDiv = document.getElementById('longitude');
		let messageDiv = document.getElementById('message');
		
		// If permission is granted and information could be loaded
		let geoSuccess = function(position) {
		    startPos = position;
		    
		    latitudeDiv.innerHTML = startPos.coords.latitude;
		    longitudeDiv.innerHTML = startPos.coords.longitude;
		    
		    let JSON = packToJSON(startPos.coords.latitude, startPos.coords.longitude);
		    console.log('JSON: ' + JSON);
		    
		    sendToServer(JSON);
		};
		
		// If an error occured, display it on the screen
		let geoError = function(error) {
		    console.log('Error occurred. Error code: ' + error.code);
		    
		    let errorMessage = '';
		    
		    switch (error.code) {
		    	case 0:
		    		errorMessage = 'Unknown error.';
		    		break;
		    	case 1:
		    		errorMessage = 'Permission denied';
		    		break;
		    	case 2:
		    		errorMessage = 'Position unavailable';
		    		break;
		    	case 3:
		    		errorMessage = 'Timed out';
		    		break;
		    }
		    
		    messageDiv = errorMessage;
		};
		
		// Call getCurrentPosition and set a callback for error handling
		navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
	}
	
	// Parses the given information to a JSON
	function packToJSON(latitude, longitude) {
		let jsonObject = {
			location : {
				latitude : latitude,
				longitude : longitude
			}
		};
		
		return JSON.stringify(jsonObject);
	}
	
	// Sends the GPS data to the server
	function sendToServer(JSON, url) {
	}
	
})();