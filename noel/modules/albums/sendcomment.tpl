<!-- BEGIN: main -->
<h3>Bình luận</h3>
	<div id="main">
		<div id="size" class="commentcontainer"></div>
		<!-- BEGIN: comment -->
		<div class="commentcontainerbo">
			<div id="addCommentContainer">
				<form id="addCommentForm" method="post" action="">
					<div>
						<label for="name">Tên ban:</label>
						<input type="text" name="name" id="name" value="{USER_NAME}" readonly="readonly" />
						<textarea name="body" id="commentbody" cols="20" rows="5"></textarea>
						<label for="body">Nội dung</label>
						<div>
						<input id="showemotion" style="width: 130px;float:right;margin-right:20px;" type="button"  value="Biểu tượng cảm xúc" />
						<input style="width: 50px;float:right;margin-right:20px;" type="button" id="buttoncontent" value="Gửi" onclick="sendcommment( '{ID}' );" />
						<div class="clear"></div>
						<div style="position:relative;">
						<div id="emotion">{EMOTIONS}</div>
						<script type="text/javascript" src="{base_url}/showemotion.js"></script>
						</div>
						</div>
					</div>
				</form>
			</div>
		</div>
		<!-- END: comment -->
		<!-- BEGIN: nocomment -->
		<p align="center"><strong>Bạn cần đăng kí hoặc đăng nhập mới có thể gửi bình luận</strong></p>
		<!-- END: nocomment -->
	</div>
	
<!-- END: main -->
