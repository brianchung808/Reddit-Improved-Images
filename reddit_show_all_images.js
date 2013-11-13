var image_visible = false;
var first_load = true;
var LOGGING = true;


$(document).ready(function() {
	// load the div to display image hover when mouseover img link...
	// also do for videos?'
	var body = $('body');
	
	var popup = jQuery('<div/>', {
		id: 'popup'
	});

	popup.css({
		'z-index': 99999999,
		'position': 'absolute'
	});

/*
	var popup_img = jQuery('<img/>', {
		id: 'popup_img'
	});
*/
	var popup_img = document.createElement('img');
	popup_img.setAttribute('id', 'popup_img');

	util.resize_image(popup_img);

	popup.append(popup_img);
	body.append(popup);

	/* Attach keydown listener for '+' key to load all images
	 */
	$('body').keydown(function(event) {
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
	});


	var currentMousePos = { x: -1, y: -1 };
    $(document).mousemove(function(event) {
        currentMousePos.x = event.pageX;
        currentMousePos.y = event.pageY;
    });



	$('.entry a').each(function() {
		$(this).mouseover(function() {
			var href = $(this).attr('href');
			$('#popup #popup_img').attr('src', href);
			$('#popup').css({
				'left': currentMousePos.x,
				'top': currentMousePos.y
			});
		});
	});
});




/* reddit namespace that holds functions that perform main functionality
 */
var reddit = {
	showAllImages: function() {
		var show_images_button = document.getElementById('viewImagesButton');

		// if reddit enhancement suite
		if(show_images_button) {
			show_images_button.click(); 

		// else, manually create image div
		} else {
			var entries = $('.entry');

			// for each of the posts
			$.each(entries, function() {
				var img_link = $(this).find('a').attr('href');

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
			    	util.resize_image(img_div);
				
			    	img_div.setAttribute('src', img_link);
			    	div.setAttribute('class', 'visible_image');

			    	a.appendChild(img_div);
			    	div.appendChild(a);

			    	$(this).append(div);

			    } // end if a valid img_link
			}); // end for each link

		} // end else
	}, 

	hideAllImages: function() {
		var pics = util.get_visible_images();

		pics.each(function() {
			util.hide($(this));
		});
	},

	unhideAllImages: function() {
		var pics = util.get_visible_images();

		pics.each(function() {
			util.show($(this));
		});
	}
}

/* util namespace that holds utility functions that are commonly useful
 */
var util = {
	VISIBLE_IMAGE_CLASS: 'visible_image',

	resize_image: function(img) {
		img.onload = function() {
    		var width = img.clientWidth;
    		var height = img.clientHeight;

    		// get any side content to calculate max content width
			var side = document.getElementsByClassName('side')[0];
			var contents = document.getElementsByClassName('contents')[0];
			var max_width = util.get_maincontent_width([side, contents]);

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

	    	img.setAttribute('width', max_width);
	    	img.setAttribute('height', max_height);

	    	util.log(img.src + " " + ratio);
	 	}
	},

	get_visible_images: function() {
		return $('.' + util.VISIBLE_IMAGE_CLASS);
	}, 

	get_maincontent_width: function(sideDivs) {
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
	},

	show: function(element) {
		if (element !== undefined && element !== null) {
			element.removeAttr('hidden');
		}
	},

	remove: function(element) {
	  if (element !== undefined && element !== null) {
	    var parent = element.parentNode;
	    parent.removeChild(element);
	  }
	},

	hide: function(element) {
		if (element !== undefined && element !== null) {
			element.attr('hidden', 'hidden');
		}		
	},

	log: function(message) {
		if(LOGGING) {
			console.log(message)
		}
	}

}

