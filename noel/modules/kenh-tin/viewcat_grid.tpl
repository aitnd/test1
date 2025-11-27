<!-- BEGIN: main -->
    <!-- BEGIN: loop -->
	<div class="news_grid">
        <!-- BEGIN: cattitle -->
			<h3 class="cat"><a title="{CAT.title}" href="{CAT.link}">{CAT.title}</a></h3>
		<!-- END: cattitle -->
		<!-- BEGIN: viewcatloop -->
			<div class="item fl" style="width: 33%">
				<div class="item_content">
					<a target="_blank" title="{CONTENT.title}" href="{CONTENT.link}">
						<img alt="{CONTENT.title}" src="{CONTENT.imghome}" width="{IMGWIDTH1}" />
					</a>
					<h2><a target="_blank" title="{CONTENT.title}" href="{CONTENT.link}">{CONTENT.title}</a></h2>				
				</div>
			</div>
		<!-- END: viewcatloop -->
		<div class="clear"></div>				
	</div>
    <!-- END: loop -->
<!-- END: main -->