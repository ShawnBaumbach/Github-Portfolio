document.getElementById("mailbutton").addEventListener("click", mail);

function mail(){
    var nav = document.getElementById("mail");
    var str = `<iframe src="https://javascript.info/class"></iframe>`;
    nav.innerHTML = str;
}
