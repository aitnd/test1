<!-- BEGIN: main  -->
<style>
.tip {color: #000000;background:#FFF;padding:5px;position:absolute;   z-index:1000;border: 3px solid #cacdd0;-webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;width:250px;opacity:0.9;filter:alpha(opacity=90);}
.tooltip .tip { display:none; }
.tip .tooltip_img{border:#ffe13b 1px solid;background: #FFFFFF;margin-top: 3px;padding:2px;}
table .tooltip_img{border:#ffe13b 1px solid;background: #FFFFFF;margin: 3px 0 0 10px;;padding:2px;width: 130px;} 
</style>
<table cellpadding="0" cellspacing="0" style="border: solid 1px #d8d8d8">
<tr style="boder: soil 1px red">
	<td width="21%" valign="middle"><a href="{SEND_URL}"><img src="{NV_BASE_URL}/images/love/love.png" border="0" /></a></td> 
	<td width="79%" valign="middle">
        <marquee style="float:right" behavior="scroll" onmouseover="this.stop()" onmouseout="this.start()" scrollamount="5" direction="left">
                <!-- BEGIN: loop -->
                    <a href="#" class="tooltip">
                        <span style="color: blue; font-weight: bold">{LOVE.sender}</span>
                        <span class="tip">Email: {LOVE.e_sender}<!-- BEGIN: p_sender --><br />{LANG.phone}: {LOVE.p_sender}<!-- END: p_sender --></span>
                    </a> 
                    {LANG.sendto}
                    <a href="#" class="tooltip">
                        <span style="color: red; font-weight: bold">{LOVE.to}</span>
                        <span class="tip">Email: {LOVE.e_to}<!-- BEGIN: p_to --><br />{LANG.phone}: {LOVE.p_to}<!-- END: p_to --></span>
                    </a>
                        {LANG.content}: <b>{LOVE.content}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <!-- END: loop -->
        </marquee>
    </td>
</tr>
</table>
<!-- END: main -->
