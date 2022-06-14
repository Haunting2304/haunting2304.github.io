document.querySelector("body").style.marginTop = `${document.querySelector("nav").offsetHeight}px`
document.querySelector("body").style.minHeight = `calc(100vh - ${(document.querySelector("nav").offsetHeight)}px - 6em)`;
window.onresize = style;
function style() {
    var nav = document.querySelector("nav");
    var navItems = document.querySelectorAll(".navItem");
    var body = document.querySelector("body");
    var navItemMaxWidth = 250;
    nav.style.width = `${body.clientWidth}px`;
    nav.style.left = `calc(50% - ${nav.offsetWidth / 2}px)`;
    for(i = 0; i < navItems.length; i++){
        if(nav.offsetWidth / navItems.length > navItemMaxWidth) {
            navItems[i].style.width = `${navItemMaxWidth}px`
            navItems[i].style.left = `${i * navItemMaxWidth}px`;
        }
        else {
            navItems[i].style.width = `${nav.offsetWidth / navItems.length}px`;
            navItems[i].style.left = `${i * (nav.offsetWidth / navItems.length)}px`;
        }
        navItems[i].childNodes[0].style.top = `${nav.offsetHeight / 2 - navItems[i].childNodes[0].offsetHeight / 2}px`
    }
}
style()