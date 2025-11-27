<!-- BEGIN: main -->
<!-- BEGIN: listcat -->
<div class="news_column">
    <div class="news-content bordersilver white clearfix">
        <div class="header clearfix">
            <a class="current" href="{CAT.link}" title="{CAT.title}"><span><span>{CAT.title}</span></span></a>
            <!-- BEGIN: subcatloop -->
            	<a href="{SUBCAT.link}" title="{SUBCAT.title}">{SUBCAT.title}</a>
            <!-- END: subcatloop -->
        </div>
        <div class="items {BORDER}clearfix">
            <!-- BEGIN: image -->
            	<a target="_blank" href="{CONTENT.link}" title="{CONTENT.title}"><img alt="{CONTENT.title}" src="{CONTENT.imghome}" width="{IMGWIDTH}" /></a>
            <!-- END: image -->
            <h3><a target="_blank" href="{CONTENT.link}" title="{CONTENT.title}">{CONTENT.title}</a></h3>
            <p>
                {CONTENT.hometext}
            </p>
        </div>
        <!-- BEGIN: related -->
        <ul class="related">
            <!-- BEGIN: loop -->
            <li>
                <a target="_blank" title="{OTHER.title}" href="{OTHER.link}">{OTHER.title}</a>
            </li>
            <!-- END: loop -->
        </ul>
        <!-- END: related -->
    </div>
</div>
<!-- END: listcat -->
<!-- END: main -->
