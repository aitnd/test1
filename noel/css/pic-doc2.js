xOffset = 10;
yOffset = 30;

function tip_img(src,nick) {
    $("#avar_preview"+nick).html("<p id='avar_pr'><img src='" + src + "' /></p>");
    $("#avar_preview" + nick)
    .css("display", "block")
    .css("position", "absolute")
    .css("z-index", "9999999")
    .css("left", "-165px")
    .css("padding", "5px")
    .css("border", "1px solid #ABBDA8")
    .css("background", "#FFFFFF")
	.fadeIn("fast");						
}
function untip_img(nick) {
    $("#avar_pr").remove();
    $("#avar_preview" + nick)
    .css("display", "none")
}


