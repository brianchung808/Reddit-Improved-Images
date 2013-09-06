var image_visible = false;
var first_load = true;
var LOGGING = true;


document.onload = function() {
	// load the div to display image hover when mouseover img link...
	// also do for videos?
}


document.body.onkeydown = function(event) {
	event = event || window.event;
	var keycode = event.charCode || event.keyCode;
	if(keycode === 187) {
		if(!image_visible && first_load) {
			reddit.showAllImages();
			first_load = false;

		} else if(!image_visible && !first_load) {
			reddit.unhideAllImages();

		} else if(image_visible) {
			reddit.hideAllImages();
		}

		image_visible = !image_visible;	
	} 
}

var reddit = {
	showAllImages: function() {
		var show_images_button = document.getElementById('viewImagesButton');

		// if reddit enhancement suite
		if(show_images_button) {
			show_images_button.click(); 

		// else, manually create image div
		} else {
			var entries = document.getElementsByClassName('entry');

			// for each of the posts
			for(var i = 0; i < entries.length; i++) {
				var $this = entries[i];
				var img_link = $this.getElementsByTagName('a')[0].href;

				// imgur case
				if(img_link.indexOf('imgur') != -1) {
					img_link = img_link + '.gif';
				}


				var img_link_lowercase = img_link.toLowerCase();

				/*
				var link_is_image = false;
				
				var img_formats = ['jpg', 'png', 'gif', 'tiff', 'bmp'];
				for(var i = 0; i < img_formats.length; i++) {
					log('yolo');
					if(img_link_lowercase.indexOf(img_formats[i]) != -1) {
						log('swaggg');
						link_is_image = true;
						break;
					}
				}
				*/

			    if(img_link_lowercase.indexOf('.jpg') != -1 ||
			    	img_link_lowercase.indexOf('.png') != -1 ||
			    	img_link_lowercase.indexOf('.gif') != -1 ||
			    	img_link_lowercase.indexOf('.tiff') != -1 ||
			    	img_link_lowercase.indexOf('.bmp') != -1) {

			    	var div = document.createElement('div');
			    	var a = document.createElement('a');
					a.setAttribute('href', img_link);
			    	var img_div = document.createElement('img');
			    		
			    	// calculate display dimensions onload
			    	img_div.onload = function() {
			    		var width = this.clientWidth;
			    		var height = this.clientHeight;

			    		// get any side content to calculate max content width
						var side = document.getElementsByClassName('side')[0];
						var contents = document.getElementsByClassName('contents')[0];
						var max_width = get_maincontent_width([side, contents]);

						// make the pic max width a bit smaller
						max_width *= 0.8;	

				    	var ratio = max_width / width; 
				    	var max_height;

				    	if(isFinite(ratio)) {
					    	if(ratio < 1.0){
					    		max_height = height * ratio;
					    	} else {
					    		max_height = height;
					    		max_width = width;
					    	}
					    } else {
					    	max_width = 0;
					    	max_height = 0;
					    }

				    	this.setAttribute('width', max_width);
				    	this.setAttribute('height', max_height);

				    	log(this.src + " " + ratio);
			    	}
				
			    	img_div.setAttribute('src', img_link);
			    	div.setAttribute('class', 'visible_image');

			    	a.appendChild(img_div);
			    	div.appendChild(a);

			    	$this.appendChild(div);

			    } // end if a valid img_link
			} // end for each link

/*
			$('.entry').each(function() {  
			  var img_link = $(this).find('a').attr('href');
			  var img_link_lowercase = img_link.toLowerCase();

			  if( img_link_lowercase.indexOf('jpg') != -1
		       || img_link_lowercase.indexOf('png') != -1
			   || img_link_lowercase.indexOf('gif') != -1 ) {

			  	var img_div = $('<a></a>');
			    img_div.attr({ href: img_link });
			    img_div.append($('<img></img>').attr({ src: img_link}));

			    //var img_div = '<a href=' + img_link + '><img src="' + img_link + '"></img></a>';
			    $(this).append(img_div);
			  }
			});
*/
		} // end else
	}, 

	hideAllImages: function() {
		var pics = document.getElementsByClassName('visible_image');

		for(var i = pics.length; i >= 0 ; i--) {
			hide(pics[i]);
		}
	},

	unhideAllImages: function() {
		var pics = document.getElementsByClassName('visible_image');

		for(var i = pics.length; i >= 0 ; i--) {
			show(pics[i]);
		}
	}
}

function get_maincontent_width(sideDivs) {
	// get window dimensions
	var w = window,
	    d = document,
	    e = d.documentElement,
	    g = d.getElementsByTagName('body')[0],
	    x = w.innerWidth || e.clientWidth || g.clientWidth,
	    y = w.innerHeight|| e.clientHeight|| g.clientHeight;


	var max_width = x;

	if(sideDivs === undefined || sideDivs === null || sideDivs.length === 0) {
		return max_width;
	}

	for(var i = 0; i < sideDivs.length; i++) {
		var $this = sideDivs[i];
		if($this) {
			max_width -= $this.clientWidth;
		}
	}

	return max_width;
}


function remove(element) {
  if (element !== undefined && element !== null) {
    var parent = element.parentNode;
    parent.removeChild(element);
  }
}

function hide(element) {
	if (element !== undefined && element !== null) {
		element.setAttribute('hidden', 'hidden');
	}
}

function show(element) {
	if (element !== undefined && element !== null) {
		element.removeAttribute('hidden');
	}
}

function log(message) {
	if(LOGGING) {
		console.log(message)
	}
} 


