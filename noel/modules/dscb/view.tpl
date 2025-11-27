<!-- BEGIN: main -->
	<div class="tieude">{CAUHINH.tieudewto}</div>
	<table class="bodertb" style="border-collapse:collapse;border-color:blue" cellpadding="2" cellspacing="2" width="100%" border="1">
        <tr class = "danhsach">
            <td align="left" width="23%" id="dstd">Họ và tên:</td>
            <td align="left" id="dstd"><b>{HOTEN}</b></td>
            <td align="center" width="90px">Hình đại diện</td>
        </tr>
        <tr class = "danhsach">
            <td align="left" id="dstd">Ngày sinh:</td>
            <td align="left" id="dstd">{NGSINH}</td>
            <td align="center" rowspan="6"><img src="{URL}" border="1" width = "100%" height="140px"></img></td>
        </tr>
        <tr class = "danhsach">
            <td align="left" id="dstd">Giới tính:</td>
            <td align="left" width="59%" id="dstd">{GTINH}</td>
        </tr>
        <tr class = "danhsach">
            <td align="left" id="dstd">Đảng Viên:</td>
            <td align="left" id="dstd">{DANG}</td>
        </tr>
        <tr class = "danhsach">
            <td align="left" id="dstd">Điện thoại:</td>
            <td align="left" id="dstd">{DTHOAI}</td>
        </tr>
        <tr class = "danhsach">
            <td align="left" id="dstd">Email:</td>
            <td align="left" id="dstd">{EMAIL}</td>
        </tr>
        <tr class = "danhsach">
            <td align="left" id="dstd">Môn giảng dạy:</td>
            <td align="left" id="dstd">{MONDAY}</td>
        </tr>
        <tr class = "danhsach">
            <td align="left" id="dstd">Chức vụ:</td>
            <td align="left" colspan="2" id="dstd">{CHUCVU}</td>
        </tr>
        <tr class = "danhsach">
            <td align="left" id="dstd">Chỗ ở hiện tại:</td>
            <td align="left" colspan="2" id="dstd">{DIACHI}</td>
        </tr>
        <tr class = "danhsach">
            <td align="left" id="dstd">Quê quán:</td>
            <td align="left" colspan="2" id="dstd">{QUEQUAN}</td>
        </tr>
        <tr class = "danhsach">
            <td align="left" id="dstd">Phụ trách:</td>
            <td align="left" colspan="2" id="dstd">{PHUTRACH}</td>
        </tr>
        <tr class = "danhsach">
            <td align="left" id="dstd">Tóm tắt bản thân:</td>
            <td align="left" colspan="2" id="dstd">{TOMTAT}</td>
        </tr>
    </table>
	<!-- BEGIN: gvkhac -->
	<br /><hr>
	<b>Các giáo viên khác thuộc tổ <font color = "green"><a href = {LINKS1}=main&toid={TOID_GV}>{TENTO}</a></font> là:</b><br />
	<div>
	<ul>
		<li class = "col1">
		<!-- BEGIN: loop_col1 -->
		<img border="0" src="{IMG}" width="10" height="14"> 
		<a href = {LINKS1}=view&gvid={GVID}&toid={TOID_GV} id="dscbgv">{GV}</a><br />
		<!-- END: loop_ds -->
		</li>
		<li class = "col2">
		<!-- BEGIN: loop_col2 -->
		<img border="0" src="{IMG}" width="10" height="14"> 
		<a href = {LINKS1}=view&gvid={GVID}&toid={TOID_GV} id="dscbgv">{GV}</a><br />
		<!-- END: loop_ds -->
		</li>
	</ul>
	<!-- END: gvkhac -->
	</div>
	<br><hr><center><b><a href="javascript:history.go(-1)">Quay lại</a> | <a href=?language=vi&nv=dscb>Trang đầu</a> | <a href=#>Lên trên</a></b></center>
<!-- END: main -->