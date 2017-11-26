(function() {
	
	window.addEventListener('load', function(event) {
		
		let circles = document.querySelectorAll('#little-circles li');
		let selectedClassName = 'selected';
		
		// Get the menu
		let singleSongMenu = document.getElementById('single-song-menu');
		
		circleArray = Array.from(circles);
		
		// Add click listeners to all circles
		circleArray.forEach(function(circle, i) {
			
			circle.addEventListener('click', function() {
				if (circle.classList.contains(selectedClassName)) {
					//  UNSELECTED Hide menu
					circle.classList.remove(selectedClassName);
					console.log('UNSELECTED');
					
					let circleDeselected = new CustomEvent('circle-deselected');
					window.dispatchEvent(circleDeselected);
				} else {
					// SELECTED Show menu
					circle.classList.add(selectedClassName);
					
					// UPDATE menu
					console.log(window.getComputedStyle(circle).backgroundColor);
					
					console.log('SELECTED');
					
					// i = current iterator, circle currect circle
					circleArray.forEach(function(circleDeselect, number) {
						if (i == number) {
							// Dispatch event to show menu
							let circleSelected = new CustomEvent('circle-selected', 
								{'detail' : { 
									'element' : circle,
									'colour' : window.getComputedStyle(circle).backgroundColor
									}
								});
							window.dispatchEvent(circleSelected);
						} else {	
							circleDeselect.classList.remove(selectedClassName);
						}
					});
				}
			});
			
		});
		
	});
	
})();