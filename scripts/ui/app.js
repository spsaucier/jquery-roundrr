jQuery(document).ready(function()
{
	  
	var currentImage = "";
	var interfaceLock = false; 

  	jQuery("#roundrr_container").roundrrwheel(
  	{
		mode: 'standard', //mode can be pick or standard
		autoplay: false,
		autoplayDirection: 'anticlockwise',
		autoplayDuration: 4000,
		centerClass: 'roundrr_center',
		listClass: 'list', 
		itemClass: 'item', 
		radius: 240, 
		animSpeed:200, 
		// centerX: 29, 
		// centerY: 60, 
		animationEffect: 1, //(1:off, 5:light,10:heavy, 15:subtle)
		selectEvent: "click", 	
		centerImageSrc: null,
		centerText: '<h4>Here is main text</h4><h6>And some more text.</h6>',
		requiredLeftA:'0', // override for positioning: main image n-1's left position
		requiredTopA:'0',  // main image n-1's top 
		requiredLeftB:'0',   //main image n+1's left
		requiredTopB:'0', //main image n+1's top
		//on selecting/clicking an item on the wheel
		onSelect: function($selected)
		{  
			showItemHtml($selected, 'noanim');
		},
		//on beginning to spin/animate the wheel
		onNextBegin: function($m)
		{
		   interfaceLock = true;
		},
		onPrevBegin: function($m)
		{
		   interfaceLock = true;
		},
		//once an image has moved under the 'pick'
		onImageFocus: function($item)
		{
        	showItemHtml($item, 'none');
		},
		//once an image/image set is no longer under the 'pick'
		onImageBlur:  function($item)
		{

		}, 
		//once the animation has completed
		onAnimationComplete: function($menu)
		{
		     interfaceLock = false;
		},
		angleOffset: -120*Math.PI/180, // -120 degrees in radians
		onShow: function($menuitems)
		{
			$menuitems.each(function(i)
			{
				var $this = jQuery(this);
				$this.delay(i*100).fadeIn(500);
			});
		}
	});
	
	jQuery("#roundrr_container").roundrrwheel("show");
	$('#prev').bind('click', spinMenuRight);
	$('#next').bind('click', spinMenuLeft);
	
	function showItemHtml($i, mode)
	{
		interfaceLock = true;
		var thisImage   = $i.find('img');
        var imageText = thisImage.data('html');
        jQuery('.roundrr_center').fadeIn();
		jQuery('.roundrr_center').html(imageText);
	}
	
	/*Spin the menu to the left*/
	function spinMenuLeft()
	{
	   if(!(interfaceLock))
	  {
	   jQuery("#roundrr_container").roundrrwheel("prev");
	   }			   
	}
	
	/*Spin the menu to the right*/
	function spinMenuRight()
	{
      if(!(interfaceLock))
	  {
	   jQuery("#roundrr_container").roundrrwheel("next");
	   } 
	}
	
	/*Keydown events*/
	$(window).keydown(function(event) 
	{
		var keycode = event.keyCode;
		switch(keycode)
		{
		  case 39:
   		  spinMenuLeft();
			  break;
			  case 37:
   		  spinMenuRight();
			   break;
     } });


});