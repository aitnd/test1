<!-- BEGIN: main -->
<!-- BEGIN: search -->
	<p><span class="search_icon"><a href="#" id="slick-toggle">{LANG.search}</a></span></p>
	<div id="slickbox" style="display: block; text-align: center" class="box">
		<form name="search" action="{ACTION}" method="post">
			<input type="text" name="key">
			<input type="submit" name="sub_search" value="{LANG.search}">
		</form>
		<font class="searchtip">{LANG.search_tip}</font>
	</div>
<!-- END: search -->

<div class="notice">{TITLE}</div>
<table border=1 style="border: solid 1px #CCCCCC; border-spacing:inherit">
  <tr>
    <td rowspan="6" style="width: 150px"><img class="tooltip_img margin-right_10 fl" src="{ROW.avt}"/></td>
    <td style="width: 130px"><span class="icon_dot">{LANG.ten}</span></td>
    <td><span class="ten">{ROW.hoten}</span></td>
  </tr>
  
  <tr>
    <td><span class="icon_dot">{LANG.ngsinh}</span></td>
    <td>{ROW.ngsinh}</td>
  </tr>
  
  <tr>
    <td><span class="icon_dot">{LANG.gtinh}</span></td>
    <td><img src="{ROW.gtinh}" width="16px" /></td>
  </tr>
  <!-- BEGIN: nvdoan -->
  <tr>
    <td><span class="icon_dot">{LANG.nvdoan}</span></td>
    <td>{ROW.nvdoan}</td>
  </tr>
  <!-- END: nvdoan -->
  
  <tr>
  <td><span class="icon_dot">{LANG.dang}</span></td>
    <td><img src="{ROW.dang}" /></td>
  </tr>
  
  <!-- BEGIN: nvdang -->
  <tr>
  <td><span class="icon_dot">{LANG.nvdang}</span></td>
    <td>{ROW.nvdang}</td>
  </tr>
  <!-- END: nvdang -->
  
  <!-- BEGIN: quequan -->
  <tr>
    <td><span class="icon_dot">{LANG.quequan}</span></td>
    <td colspan="2">{ROW.quequan}</td>
  </tr>
  <!-- END: quequan -->
  
  <!-- BEGIN: diachi -->
  <tr>
    <td><span class="icon_dot">{LANG.diachi}</span></td>
    <td colspan="2">{ROW.diachi}</td>
  </tr>
  <!-- END: diachi -->
  
  <tr>
    <td><span class="icon_dot">{LANG.donvi}</span></td>
    <td colspan="2">{ROW.tendonvi} <a href="{DV_LINK}">{DV_K}</a></td>
  </tr>

   <tr>
    <td><span class="icon_dot">{LANG.chucvu}</td>
    <td colspan="2">
		<span class="cv1">{ROW.CHUCVU1}</span>
		<!-- BEGIN: cv2 -->
			<span class="cv2">{ROW.CHUCVU2}</span>
		<!-- END: cv2 -->
		
		<!-- BEGIN: cv3 -->
			<span class="cv3">{ROW.CHUCVU3}</span>
		<!-- END: cv3 -->
	</td>
  </tr>

  <tr rowspan="3">
    <td rowspan="3"><span class="icon_dot">{LANG.onl}</span></td>

		<td><span class="icon_dot">{LANG.lienchi}</span></td>
	<td colspan="2">{ROW.lienchi}</td>
  </tr>


  <tr rowspan="3">
		<td><span class="icon_dot">{LANG.kyluat}</span></td>
	<td colspan="2">{ROW.kyluat}</td>
  </tr>


  <tr rowspan="3">
    <td><span class="icon_dot">{LANG.doanphi}</span></td>
    <td colspan="2">{ROW.doanphi}</td>
  </tr>

  <tr>
    <td><span class="icon_dot">{LANG.nhanxet}</span></td>
    <td colspan="2">{ROW.nhanxet}</td>
  </tr>

</table>
<div class="shadow"></div>
<!-- END: main -->