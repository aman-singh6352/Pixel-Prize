const icon = document.querySelector('.bar');
const navlist = document.querySelector('.nav-list');
let click = false;
icon.addEventListener("click", function() {
    if(click == false) {
        navlist.style.display = "block";
        click = true;
    }
    else {
        navlist.style.display = "none";
        click = false;
    }
})