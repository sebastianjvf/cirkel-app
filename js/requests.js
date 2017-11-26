let baseUrl = 'http://95.85.31.26/';
let userEndpoint = 'users/';

function sendRequest(url, method, eventname, callback) {
	// Make a request
	let request = new XMLHttpRequest();
	let JSON = '';
	
	request.onreadystatechange = function() {
	    // When the request was successful
	    if (this.readyState == 4 && this.status == 200) {
	      
	       // Loading screen
	       console.log(request.responseText);
	       dataReceived =  request.responseText;
	       
	       // Dispatch a data received event to update the UI
	       // let dataReceived now		       
	       let event = new CustomEvent(eventname, {
	       		detail: dataReceived
	       });
	       
	       window.dispatchEvent(event);
	    }
	};
	
	window.addEventListener(eventname, callback);
	
	if (method === 'POST') {
		// Add a header to every POST request
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	}
	
	// Start the connection
	request.open(method, url, true);
	
	// Send a JSON string if given
	// Has to be POST
	if (JSON === '' || !JSON) {
		request.send();
	} else {
		request.send(JSON);
	}
}

/* REQUEST THE GEO DATA */
function requestGeoData() {
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
	
	// If permission is granted and information could be loaded
	let geoSuccess = function(position) {
	    startPos = position;
	    
	    let latitude = startPos.coords.latitude;
	    let longitude = startPos.coords.longitude;
	    
	    // Parse to JSON
	    let JSON = packToJSON(latitude, longitude);
	    console.log('JSON: ' + JSON);
	    
	    // Send to server on call and receive some output
	    // TODO
	    sendLocationRequest(JSON, 'url');
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
	    
	    console.log(errorMessage);
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
function sendLocationRequest(JSON, url) {
	// Make a request
	let request = new XMLHttpRequest();
	
	request.onreadystatechange = function() {
	    // When the request was successful
	    if (this.readyState == 4 && this.status == 200) {
	      
	       // Loading screen
	       // TODO
	       dataReceived =  request.responseText;
	       console.log("Data received: " + dataReceived);
	       
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
	request.open('GET', url, true);
	
	// Send a JSON string
	request.send(JSON);
}