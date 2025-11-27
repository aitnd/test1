<!-- BEGIN: main -->
<div id="slide-style">
	<div class="border_slide">
		<div id="sliderlist" class="sliderwrapper">
			<!-- BEGIN: nav -->
			<div class="contentdiv">
				<a class="lightbox" href="{main.homeimgfile}"> <img src="{main.homeimgfile}" alt="{main.homeimgalt}" /></a>
				<div class="contenttitle"><a href="{main.link}">{main.title}</a></div>
					{main.hometext}
				</div>
			<!-- END: nav -->
		</div>
		<div id="paginate-sliderlist">
			<div class="box_list">
				<div class="slide_title"> 
				</div>
					<ul>
					<!-- BEGIN: content -->
						<li><a href="{main.link}" class="toc">{main.title}</a></li>					
					<!-- END: content -->
					</ul>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	featuredcontentslider.init({
		id: "sliderlist",
		contentsource: ["inline", ""],
		toc: "markup",
		nextprev: [""],
		revealtype: "mouseover",
		enablefade: [true, 0.2],
		autorotate: [true, 3000],
		onChange: function(previndex, curindex){
		}
	})
</script>
<!-- END: main -->