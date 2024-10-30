
wp.domReady(() => { //
	document.addEventListener('readystatechange', event => {


		// When HTML/DOM elements are ready:
		if (event.target.readyState === "interactive") {   //does same as:  ..addEventListener("DOMContentLoaded"..
			// alert("hi 1");
		}

		// When window loaded ( external resources are loaded too- `css`,`src`, etc...)
		if (event.target.readyState === "complete") {

			addEventListners();
			
		}
	});
});
function addEventListners() {
	const social_links = document.querySelectorAll(".wp-social-link");
	social_links.forEach(social_link =>  {
		
		social_link.addEventListener("mouseover", function() {
			var hover_background_color = this.getAttribute('data-hover-background-color');
			if (hover_background_color != '') {
				// before overriding store existing background-color in data-attribute if it is not set
				if ( this.getAttribute('data-background-color') == null ) {
					this.setAttribute('data-background-color', this.style.backgroundColor);	
				}
				this.style.backgroundColor = hover_background_color;
			}

			var hover_color = this.getAttribute('data-hover-color');
			if (hover_color != '') {
				if ( this.getAttribute('data-color') == null ) {
					this.setAttribute('data-color', this.style.color);	
				}
				this.style.color = hover_color;
			}
		})
		social_link.addEventListener("mouseleave", function() {
			var background_color = this.getAttribute('data-background-color');
			if (background_color != '') {
				this.style.backgroundColor = background_color;
			}

			var color = this.getAttribute('data-color');
			if (color != '') {
				this.style.color = color;
			}
		})
		
	});
}