(function() {
	
	window.addEventListener('load', function() {
		
		/* Define elements and functions */
		let menuBar = document.getElementsByTagName('header')[0];
		let visualisation = document.getElementById('visualisation');
		let coloursAroundYou = document.getElementById('song-list');
		let singleSongMenu = document.getElementById('single-song-menu');
		let circleEnvironment = document.getElementById('little-circles');
		let userCircle = document.getElementById('user-circle');
		let textLabel = document.getElementById('text');
		let perimetre = document.getElementById('perimetre');
		let closeSingeSongMenuButton = document.getElementById('close-single-song');
		
		function showMenuBar() {
			menuBar.style.top = '0';
		}
		
		function hideMenuBar() {
			menuBar.style.top = '-50%';
		}
		
		function showVisualisation() {
			visualisation.style.opacity = '1';
			visualisation.style.pointerEvents = 'auto';
			userCircle.style.pointerEvents = 'auto';
		}
		
		function hideVisualisation() {
			visualisation.style.opacity = '0';
			visualisation.style.pointerEvents = 'none';
			userCircle.style.pointerEvents = 'none';
			
			hideCircleEnvironment();
		}
		
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
			// TODO
			
			// Remove pointer and click events
			userCircle.pointerEvents = 'none';
		}
		
		function hidePulse() {
			perimetre.classList.remove('pulsing');
			
			// Finish the animation at the end
			perimetre.style.opacity = '0';
			perimetre.style.pointerEvents = 'none';
			
			// Fade out the text label
			textLabel.style.opacity = '0';
		}
		
		// Listen for selected events
		window.addEventListener('circle-selected', function(event) {
			hideSongList();
			showSingleSongMenu();
			document.getElementsByClassName('song-colour')[0].style.backgroundColor = event.detail.colour;
			console.log(event.detail.element);
		});
		
		// Listen for deselected events
		window.addEventListener('circle-deselected', function(event) {
			showSongList();
			hideSingleSongMenu();
		});
		
		// Close single song menu on click, unselect elements and show menu 
		closeSingeSongMenuButton.addEventListener('click', function(event) {
			
			hideSingleSongMenu();
			showSongList();
			
			// Hide
			let circles = document.querySelectorAll('#little-circles li');
			console.log(circles);
			Array.from(circles).forEach(function(element) {
				element.classList.remove('selected');
			});
		});
		
		// Hide everything on load
		showMenuBar();
		hideSongList();
		hideSingleSongMenu();
		hideCircleEnvironment();
		showVisualisation();
		
		// Start app on click
		userCircle.addEventListener('click', function () {
			showPulse('Analysing...');
			
			// After 3 seconds, make circles appear
			setTimeout(function() {
				updatePulseText('Finding<br>music...');
				
				setTimeout(function() {
					showCircleEnvironment();
					showSongList();
					updatePulseText('Your colour.');
					
					setTimeout(function() {
						hidePulse();
						
					}, 1100);
					
				}, 1500);
				
			}, 1500);
		});
		
	});
	
})();