(function() {
	
	window.addEventListener('load', function() {
		
		let coloursAroundYou = document.getElementById('song-list');
		let hasColoursAroundYou = false;
		
		let singleSongMenu = document.getElementById('single-song-menu');
		let hasSingleSongMenu = false;
		
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
		
		showSongList();
		hideSingleSongMenu();
		
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