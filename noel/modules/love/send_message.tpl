<!-- BEGIN: main -->
<div class="box-border">
    <div class="content-box">
        <!-- BEGIN: loop -->
            <span class="error">{ERROR}</span>
        <!-- END: loop -->
        <form class="form" action="{ACTION}" method="post" onsubmit="return checkCheckBox(this)">
            <div class="love-form box-border content-box">  
                <p class="name">
                    <input type="text" name="sender" id="sender" value="{LOVE.sender}" {READONLY} />  
                    <label for="sender">{LANG.sender}</label>  
                </p>  
                <p>  
                    <input type="text" name="e_sender" id="e_sender" value="{LOVE.e_sender}" {READONLY} />  
                    <label for="e_sender">{LANG.email}</label>  
                </p>
                <p>  
                    <input type="text" name="p_sender" id="p_sender" value="{LOVE.p_sender}" />  
                    <label for="p_sender">{LANG.phone}</label>  
                </p>
                  
                <p class="sub">  
                    <input type="text" name="to" id="to" value="{LOVE.to}" />  
                    <label for="to">{LANG.to}</label>  
                </p>
                <p class="sub">  
                    <input type="text" name="e_to" id="e_to" value="{LOVE.e_to}" />  
                    <label for="e_to">{LANG.email}</label>  
                </p>
                <p class="sub">  
                    <input type="text" name="p_to" id="p_to" value="{LOVE.p_to}" />  
                    <label for="p_to">{LANG.phone}</label>  
                </p>
                <p class="text">  
                    <textarea name="content">{LOVE.content}</textarea>
                </p>  
                
                <!-- BEGIN: captcha -->
                <table border=0>
                <tr>
                <td style="width: 70px">{LANG.captcha}</td>
                <td style="width: 100px"><img id="vimglogin" alt="{N_CAPTCHA}" title="{N_CAPTCHA}" src="{SRC_CAPTCHA}" width="{GFX_WIDTH}" height="{GFX_HEIGHT}" /></td><td><img src="{CAPTCHA_REFR_SRC}" class="refesh" alt="{CAPTCHA_REFRESH}" onclick="nv_change_captcha('vimglogin','seccode_iavim');"/></td>
                <td><input name="nv_seccode" id="seccode_iavim" class="required" maxlength="{GFX_MAXLENGTH}" style="width: 170px; height: 10px" /></td>
                </tr>
                </table>
                <!-- END: captcha -->
                
                <p class="submit">                    
                    <b>{NOTE}</b><br /><br />
                    <input type="submit" value="{LANG.send}" name="confirm" />
                    <input type="reset" value="{LANG.ref}" name="confirm" />  
                </p>
            </div>  
        </form> 
    </div>
</div>    
<!-- END: main -->