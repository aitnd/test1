<!-- BEGIN: main -->
{FILE "header.tpl"}
<div class="main">
    <div class="col-a2">
        [LEFT]
    </div>
    <div class="col-a1 last">
        [HEADER]
		<div class="clear">
		</div>
        <div class="box-border m-bottom" style="background:#fff">
	<div class="header-block2">
		<h3><span>Các khóa học nổi bật</span></h3>
	</div>
	<div class="content-box">
		{MODULE_CONTENT}
	</div>
</div>
        <div class="clear">
		</div>
        <div style="float:left; width:64%;">
        [CENTER1]
        </div>
        <div style="float:right; width:34%;">
        [CENTER2]
        </div>
		<div class="clear">
		</div>
        <div class="box-border m-bottom" style="background:#fff">
	<div class="header-block2">
		<h3><span>Tin tức sự kiện</span></h3>
	</div>
	<div class="content-box">
		[BOTTOM]
	</div>
        </div>
    </div>
    <div class="clear">
    </div>
</div>
{FILE "footer.tpl"}<!-- END: main -->
