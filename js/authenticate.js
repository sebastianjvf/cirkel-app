(function() {

	window.addEventListener('load', function() {
		
		// Find the start button and menu bar
		let startButton = document.getElementById('start-button');
		let menuBar = document.getElementsByTagName('header')[0];
		
		function showMenuBar() {
			menuBar.style.top = '0';
		}
		
		function hideMenuBar() {
			menuBar.style.top = '-50%';
		}
		
		showMenuBar();
		
		startButton.addEventListener('click', function() {
			
			// Make post request
			sendRequest(baseUrl + userEndpoint, 'POST', 'authenticated', function(event) { 
				console.log(event.detail);
			});
			
		});
		
	});

})();