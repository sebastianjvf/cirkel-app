(function() {
	
	window.addEventListener('load', function() {
		
		let coloursAroundYou = document.getElementById('song-list');
		let hasColoursAroundYou = false;
		
		function showSongList() {
			coloursAroundYou.style.bottom = '0';
		}
		
		function hideSongList() {
			coloursAroundYou.style.bottom = '-100vh';
		}
		
		hideSongList();
		
		// Listen for selected events
		window.addEventListener('circle-selected', function(event) {
			showSongList();
		});
		
		// Listen for deselected events
		window.addEventListener('circle-deselected', function(event) {
			hideSongList();
		});
		
	});
	
})();