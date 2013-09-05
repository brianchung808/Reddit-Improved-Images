var image_visible = false;
var first_load = true;

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

				// get window dimensions
				var w = window,
				    d = document,
				    e = d.documentElement,
				    g = d.getElementsByTagName('body')[0],
				    x = w.innerWidth || e.clientWidth || g.clientWidth,
				    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

				// calculate width for image by getting window height - sidebars
				var side = document.getElementsByClassName('side')[0];
				var contents = document.getElementsByClassName('contents')[0];

				var sidebars_width;

				if(side && contents) {
					sidebars_width = side.offsetWidth + contents.offsetWidth;
				} else if(side) {
					sidebars_width = side.offsetWidth;
				} else if(contents) {
					sidebars_width = contents.offsetWidth;
				} else {
					sidebars_width = 0;
				}

				var max_width = x - sidebars_width;
				// var max_width = $this.offsetWidth;

				// make the pic max width a bit smaller
				max_width *= 0.8;

				// console.log(max_width);

				var img_link = $this.getElementsByTagName('a')[0].href;
				var img_link_lowercase = img_link.toLowerCase();

				/*
				var link_is_image = false;
				
				var img_formats = ['jpg', 'png', 'gif', 'tiff', 'bmp'];
				for(var i = 0; i < img_formats.length; i++) {
					console.log('yolo');
					if(img_link_lowercase.indexOf(img_formats[i]) != -1) {
						console.log('swaggg');
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

			    	var a = document.createElement('a');
					a.setAttribute('href', img_link)  	;
			    	var img_div = document.createElement('img');
			    	img_div.setAttribute('src', img_link);
			    	img_div.setAttribute('class', 'visible_image');

			    	// append to get the dimensions
			    	document.body.appendChild(img_div);

			    	var ratio = max_width / img_div.offsetWidth; 
			    	var max_height = img_div.offsetHeight * ratio;
			    	img_div.setAttribute('width', max_width);
			    	img_div.setAttribute('height', max_height);

			    	remove(img_div);



			    	a.appendChild(img_div);

			    	$this.appendChild(a);
			    }
			}

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
		}
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


