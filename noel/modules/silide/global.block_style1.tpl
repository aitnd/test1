<!-- BEGIN: main -->
<link rel="stylesheet" href="{NV_BASE_SITEURL}themes/{TEMPLATE}/css/style1/default.css" type="text/css" media="screen" /> 
<link rel="stylesheet" href="{NV_BASE_SITEURL}themes/{TEMPLATE}/css/style1/nivo-slider.css" type="text/css" media="screen" />
<style type="text/css">
		#dev7link {
		position:absolute;
		top:0;
		left:50px;		
		width:60px;
		height:67px;
		border:0;
		display:block;
		text-indent:-9999px;
		}
		
		.theme-default #slider {    
			width:{config.width}px; /* Make sure your images are the same size */
			height:{config.height}px; /* Make sure your images are the same size */
		}		
</style>
<div class="slider-wrapper theme-default">            
  <div id="slider" class="nivoSlider">
   <!-- BEGIN: loop -->
      <img src="{silide.link}" alt="{silide.name}" title="{silide.name}" width="{config.width}" />
   <!-- END: loop -->
   </div>            
</div>
<div>&nbsp;</div>
<script type="text/javascript" src="{NV_BASE_SITEURL}themes/{TEMPLATE}/css/style1/jquery.nivo.slider.pack.js"></script>
<script type="text/javascript">
  jQuery.noConflict();(function($) {// Khai Bao Tranh JQuery Bi Xung Dot  
	$(document).ready(function(){
        $('#slider').nivoSlider();	  	
  	});	
  })(jQuery);// #Khai Bao Tranh JQuery Bi Xung Dot
</script>

<script type="text/javascript" src="{NV_BASE_SITEURL}js/jquery/jquery.min.js"></script>

<!-- END: main -->