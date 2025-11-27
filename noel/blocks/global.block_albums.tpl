<!-- BEGIN: main  -->
<div id="wrapper1">
	<div id="body">
			<div id="bigPic">
				 <!-- BEGIN: loop -->
				<img src="{link}" alt="{name}" title="{description}" width="640px" height="300px" />
				 <!-- END: loop -->
			 </div>
			 <ul id="thumbs">
				<!-- BEGIN: loop1 -->
				<li style="list-style:none; width:27%; float:left;" rel='{rel}'>
					<img src="{linkthumb}" alt="{name}" class="ds-img ds-border" width="80px" height="70px" border="0" />
					<!-- style="opacity:0.4;filter:alpha(opacity=40)" onmouseover="this.style.opacity=1;this.filters.alpha.opacity=100" onmouseout="this.style.opacity=0.4;this.filters.alpha.opacity= 40" -->
				<div class="bg_pic_shadow"></div>
				<div style="text-align:center;font-size:.8em;margin-bottom:0px;margin-top:-5px"> <a href="{link}">{name}</a></div>
				</li>
				 <!-- END: loop1 -->
			</ul>
	</div>
		<div class="clearfix"></div>
</div>
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
<script type="text/javascript" src="{NV_BASE_SITEURL}themes/{TEMPLATE}/js/jquery-1.4.1.js"></script>
			
<!-- END: main -->