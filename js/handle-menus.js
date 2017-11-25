(function() {
	
	window.addEventListener('load', function() {
		
		let coloursAroundYou = document.getElementById('song-list');
		let hasColoursAroundYou = false;
		
		let singleSongMenu = document.getElementById('single-song-menu');
		let hasSingleSongMenu = false;
		
		let circleEnvironment = document.getElementById('little-circles');
		let hasCircleEnvironment = false;
		
		let userCircle = document.getElementById('user-circle');
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
		
		function showPulse(text) {
			// Update text
			userCircle.innerHTML = text;
			let pulse = document.createElement('div');
			pulse.id = 'perimetre';
			pulse.classList.add('pulsing');
			console.log(pulse);
			userCircle.appendChild(pulse);
			
			// Remove pointer and click events
			userCircle.pointerEvents = 'none';
		}
		
		function hidePulse() {
			perimetre.classList.remove('pulsing');
		}
		
		// Call on load up
		hideSongList();
		hideSingleSongMenu();
		hideCircleEnvironment();
		
		userCircle.addEventListener('click', function () {
			showPulse('Your colour.');
			showCircleEnvironment();
			showSongList();
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