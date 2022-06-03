

function changeColor(eleId) {
    var color = "#f00|#0f0|#00f|#880|#808|#088|yellow|green|blue|gray";
    color = color.split("|");
    document.getElementById(eleId).style.color = color[parseInt(Math.random() * color.length)];
}


