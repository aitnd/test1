<!-- BEGIN: main -->
	<!-- BEGIN: block_tc-->
	<form id="searchto" name="searchto" method="post" align="center">
	<div align="center">	
		<select name="tcid" >
			<option value=0>Chọn tổ chức cần xem</option>
		<!-- BEGIN: loop_ds-->
			<option value={TCID}>{TENTC}</option>
		<!-- END: loop_ds -->
		</select>
	<button id="button_submit" value="click" type="submit">Tra cứu</button>
	</div>
	</form>
	<!-- END: block_tc -->
	<div class="tieude">{CAUHINH.tieudetc}</div>
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
		<td align = "left" id="dstd"><a href = {LINKS1}=viewtc&gvid={GVID}&tcid={TCID_GV}>{HOTEN}</a></td>
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
	<div class="total">Tổng cộng có <b>{TOTAL}</b> thành viên viên thuộc <b>{TOTAL_TC}</b> tổ chức</div>
<!-- END: main -->