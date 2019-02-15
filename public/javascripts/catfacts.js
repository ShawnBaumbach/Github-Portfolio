document.getElementById("catButton").addEventListener("click", function(){
    var nav = document.getElementById("catFacts");
    var request = new XMLHttpRequest();

    //using a proxy to work around cors
    request.open('GET', 'https://cors-anywhere.herokuapp.com/https://catfact.ninja/fact', true);
    request.onload = function () {
        var data = JSON.parse(this.response);

        if (request.status >= 200 && request.status < 400) {
            nav.innerHTML = data.fact;

        } else {
            console.log('error');
        }
    }

    request.send();
    
  });