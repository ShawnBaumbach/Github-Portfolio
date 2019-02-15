function navbar() {
    var nav = document.getElementById("navigation");
    var str = `
    <div class="topnav">
        <div class="navhome">
            <a href="/">Home</a>
        </div>
        <div class="navlinks">
            <a href="/forms">Forms</a>
            <a href="/Projects">Projects</a>
            <a href="/Contact">Contact</a>
        </div>
    </div>
    `

    var name = location.pathname;
    str = str.replace(`<a href="` + name + `">`, `<a class="active" href="` + name + `">`);
    nav.innerHTML = str;

  }
  window.onload=navbar;