<!-- BEGIN: main -->

<script type="text/javascript">
$(function() {
	$('.neoslideshow img:gt(0)').hide();
	setInterval(function(){
      $('.neoslideshow :first-child').fadeOut()
         .next('img').fadeIn()
         .end().appendTo('.neoslideshow');}, 
      4000);
})
</script>
<style type="text/css">
.neoslideshow {position:relative; width:{config.width}px; height:{config.height}px;}
.neoslideshow img {position:absolute;left:0; top:0;}
.padding1 {
	float:left;
	
}
</style>
<div class="padding15">
    <div class="neoslideshow">
      <!-- BEGIN: loop -->
      	<img title="{silide.name}" src="{silide.link}" width="{config.width}" height="{config.height}" />
      <!-- END: loop -->
    </div>    
</div>
<div>&nbsp;</div>
<!-- END: main -->