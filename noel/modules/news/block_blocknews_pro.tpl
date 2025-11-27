<!-- BEGIN: main -->
 <script type="text/javascript" src="{NV_BASE_SITEURL}slide/jquery-mousewheel/jquery.mousewheel.min.js"></script>

		<link rel="stylesheet" type="text/css" href="{NV_BASE_SITEURL}slide/slidedeck.skin.css" media="screen" />
 
        <!--[if lte IE 8]>
        <link rel="stylesheet" type="text/css" href="{NV_BASE_SITEURL}slide/slidedeck.skin.ie.css" media="screen,handheld" />
        <![endif]-->
		
        <!-- Include the SlideDeck jQuery script. -->
		<script type="text/javascript" src="{NV_BASE_SITEURL}slide/slidedeck.jquery.lite.pack.js"></script>
 <style type="text/css">
            #slidedeck_frame {
                width: 930px;
                height: 250px;
            }    
.skin-left  {
     width: 400px;
}			
 .skin-right  {
     width: 100px;
}	       </style>
 <div id="slidedeck_frame" class="skin-slidedeck">  	<dl class="slidedeck">
            	 <!-- BEGIN: loop -->
           
             
				
                  
		
				<dt><a href="" title="{TITLE}"style="color:red;">{ROW.catid} </a></dt>
				<dd>
				
				
				
				
			<li class="case verticalSlide_1" style="list-style-type: none; position: absolute;  ">
			<div id="slidedeck_frame" ><div class="scu-8">
			<a href="{ROW.link}" title="{TITLE}"><img src="{ROW.thumb}"width="420" height="220" alt="" /></a>
			</div>	<div class="scu-9">
			<a href="{ROW.link}" title="{TITLE}"style="color:red;">      	{ROW.hometext}</a>
			
			<span style="float:right;color: #000;padding-top: 2px;padding-right: 20px;"><a href="{ROW.link}" >›› xem chi tiết </a></span>
			
			</div>	</div>
		
		</dd>
		<!-- END: loop -->	</dl>
      </div>
			<script type="text/javascript">
			$('.slidedeck').slidedeck({
                autoPlay: true,
                cycle: true, 
                autoPlayInterval: 5000 
            });
		</script>
					
<!-- END: main -->
