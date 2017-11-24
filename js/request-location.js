/* REQUEST THE GEO LOCATION */
(function() {
	
	// Onload
	window.addEventListener('load', loadGeoData);
	
	// When data was received, update the UI
	let dataReceived = 'data-received';
	window.addEventListener(dataReceived, updateUI);
	
	function loadGeoData() {
		// Check for support
		if (navigator.geolocation) {
		  console.log('Geolocation is supported!')
		  
		  makeLocationCall();
		  
		} else {
		  console.log('Geolocation is not supported for this Browser/OS.');
		}
	}
	
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
		    
		    let latitude = startPos.coords.latitude;
		    let longitude = startPos.coords.longitude;
		    
		    latitudeDiv.innerHTML = latitude;
		    longitudeDiv.innerHTML = longitude;
		    
		    // Parse to JSON
		    let JSON = packToJSON(latitude, longitude);
		    console.log('JSON: ' + JSON);
		    
		    // Send to server on call and receive some output
		    // TODO
		    sendRequest(JSON, 'url');
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
	
	// Parses the given information to JSON
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
	function sendRequest(JSON, url) {
		// Make a request
		let request = new XMLHttpRequest();
		
		request.onreadystatechange = function() {
		    // When the request was successful
		    if (this.readyState == 4 && this.status == 200) {
		      
		       // Loading screen
		       document.getElementById('message').innerHTML = request.responseText;
		       dataReceived =  request.responseText;
		       
		       // TODO
		       // process dataReceived
		       
		       // Dispatch a data received event to update the UI
		       // let dataReceived now		       
		       let event = new CustomEvent(dataReceived, {
		       		detail: dataReceived
		       });
		       
		       window.dispatchEvent(event);
		    }
		};
		
		// Start the connection
		request.open('POST', url, true);
		
		// Send a JSON string
		request.send(JSON);
	}
	
	// Updates the UI with the data which was received
	function updateUI(event) {
		// event.detail holds the data
	}
	
})();