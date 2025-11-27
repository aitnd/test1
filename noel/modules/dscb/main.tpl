<!-- BEGIN: main -->
	<!-- BEGIN: block_to-->
	<form id="searchto" name="searchto" method="post" align="center">
	<div align="center">	
		<select name="toid" >
			<option value=0>Chọn tổ cần xem</option>
		<!-- BEGIN: loop_ds-->
			<option value={TOID}>{TENTO}</option>
		<!-- END: loop_ds -->
		</select>
	<button id="button_submit" value="click" type="submit">Tra cứu</button>
	</div>
	</form>
	<!-- END: block_to -->
	<div class="tieude">{CAUHINH.tieudeto}</div>
	<br />
	<!-- BEGIN: block_table -->
	<table class="tableds" style="border-collapse:collapse;border-color:blue" cellpadding="2" cellspacing="2" width="100%" border="1">
	<tr class = "thu">
		<td>STT</td>
		<td>Họ và tên</td>
		<td>Ngày sinh</td>
		<td>Điện thoại</td>
		<td>Chức vụ</td>
	</tr>

	<!-- BEGIN: block_ds -->
	<tr  class = "danhsach">
		<td>{STT}</td>
		<td align = "left" id="dstd"><a href = {LINKS1}=view&gvid={GVID}&toid={TOID_GV}>{HOTEN}</a></td>
		<td>{NGSINH}</td>
		<td>{DTHOAI}</td>
		<td>{CHUCVU}</td>
	</tr>
	<!--END: block_ds -->
	<!-- END: block_table -->
	</table>
	<br />
	<center>{LINKS}</center>
	<br />
	<div class="total">Tổng cộng có <b>{TOTAL}</b> cán bộ (giáo viên) thuộc <b>{TOTAL_TO}</b> phòng - ban (trường)</div>
<!-- END: main -->