(function() {
	
	window.addEventListener('load', function() {
		
		let coloursAroundYou = document.getElementById('song-list');
		let hasColoursAroundYou = false;
		
		let singleSongMenu = document.getElementById('single-song-menu');
		let hasSingleSongMenu = false;
		
		let circleEnvironment = document.getElementById('little-circles');
		let hasCircleEnvironment = false;
		
		let userCircle = document.getElementById('user-circle');
		let textLabel = document.getElementById('text');
		let perimetre = document.getElementById('perimetre');
		let isPulsing = false;
		
		function showSongList() {
			coloursAroundYou.style.bottom = '0';
		}
		
		function hideSongList() {
			coloursAroundYou.style.bottom = '-100vh';
		}
		
		function showSingleSongMenu() {
			singleSongMenu.style.bottom = '0';
		}
		
		function hideSingleSongMenu() {
			singleSongMenu.style.bottom = '-100vh';
		}
		
		function showCircleEnvironment() {
			circleEnvironment.style.opacity = '1';
			circleEnvironment.style.pointerEvents = 'auto';
		}
		
		function hideCircleEnvironment() {
			circleEnvironment.style.opacity = '0';
			circleEnvironment.style.pointerEvents = 'none';
		}
		
		function updatePulseText(text) {
			textLabel.innerHTML = text;
		}
		
		function showPulse(text) {
			// Update text
			updatePulseText(text);
			
			// Create the pulse
			// Add pulse
			perimetre.classList.add('pulsing');
			
			// Adjust colours
			userCircle.style.backgroundColor = '#B9316E';
			userCircle.style.color = '#791240';
			
			// update
			
			// Remove pointer and click events
			userCircle.pointerEvents = 'none';
		}
		
		function hidePulse() {
			perimetre.classList.remove('pulsing');
		}
		
		// Hide everything on load
		hideSongList();
		hideSingleSongMenu();
		hideCircleEnvironment();
		
		userCircle.addEventListener('click', function () {
			showPulse('Analysing...');
			
			// After 3 seconds, make circles appear
			setTimeout(function() {
				updatePulseText('Finding music...');
				
				setTimeout(function() {
					showCircleEnvironment();
					showSongList();
					updatePulseText('Your colour.');
					
					setTimeout(function() {
						hidePulse();
					}, 2300);
					
				}, 1500);
				
			}, 2000);
		});
		
		// Listen for selected events
		window.addEventListener('circle-selected', function(event) {
			hideSongList();
			showSingleSongMenu();
		});
		
		// Listen for deselected events
		window.addEventListener('circle-deselected', function(event) {
			showSongList();
			hideSingleSongMenu();
		});
		
	});
	
})();