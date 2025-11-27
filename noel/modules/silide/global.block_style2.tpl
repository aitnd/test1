<!-- BEGIN: main -->
<link rel="stylesheet" href="{NV_BASE_SITEURL}themes/{TEMPLATE}/css/style1/main_style2.css" type="text/css" media="screen" />
<style type="text/css">
	#bigPic{
	width:{config.width}px;
	height:{config.height}px;
	padding:1px;
	border:1px solid #CCC;
	background-color:#FFF;
	margin-bottom:10px;
	}
</style> 
<div id='slie2_body'>
	<div id="bigPic">
    <!-- BEGIN: img -->
    	<a href="{silide.url}" title="{silide.name}">
        <img src="{silide.link}" alt="{silide.name}" width="{config.width}" height="{config.height}"/></a>
    <!-- END: img -->
    </div>
    
    <ul id="thumbs" >
    <!-- BEGIN: thumbs -->
    	<li rel='{silide.sapxep}'><img  src="{silide.thumb}" alt="{silide.name}" /></li>
    <!-- END: thumbs -->
    </ul>
    
</div>
<div class='clearfix'></div>
<script type="text/javascript">
	var currentImage;
    var currentIndex = -1;
    var interval;
    function showImage(index){
        if(index < $('#bigPic img').length){
        	var indexImage = $('#bigPic img')[index]
            if(currentImage){   
            	if(currentImage != indexImage ){
                    $(currentImage).css('z-index',2);
                    clearTimeout(myTimer);
                    $(currentImage).fadeOut(250, function() {
					    myTimer = setTimeout("showNext()", 3000);
					    $(this).css({'display':'none','z-index':1})
					});
                }
            }
            $(indexImage).css({'display':'block', 'opacity':1});
            currentImage = indexImage;
            currentIndex = index;
            $('#thumbs li').removeClass('active');
            $($('#thumbs li')[index]).addClass('active');
        }
    }
    
    function showNext(){
        var len = $('#bigPic img').length;
        var next = currentIndex < (len-1) ? currentIndex + 1 : 0;
        showImage(next);
    }
    
    var myTimer;
    
    $(document).ready(function() {
	    myTimer = setTimeout("showNext()", 3000);
		showNext(); //loads first image
        $('#thumbs li').bind('click',function(e){
        	var count = $(this).attr('rel');
        	showImage(parseInt(count)-1);
        });
	});
    
	
	</script>
<!-- END: main -->