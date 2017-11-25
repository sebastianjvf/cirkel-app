(function() {

	// Document loaded
	window.addEventListener('load', function() {
		
		let addButtons = document.getElementsByClassName('add');
		
		Array.from(addButtons).forEach(function(element) {
			
			element.addEventListener('click', function() {
				element.className = 'added';
			});
			
		});
		
	});
	
})();