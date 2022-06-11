var itemIndex;
var itemIndex2;
var itemPrev;
var score = 0;
var statsState = false;
var statsButtonState = false;
if(localStorage.getItem("bestScore") == undefined){
    localStorage.setItem("bestScore", 0)
}
document.getElementById("bestScore").innerHTML = `Highscore = ${parseInt(localStorage.getItem("bestScore"))}`;
if(localStorage.getItem("roundsPlayed") == undefined){
    localStorage.setItem("roundsPlayed", 0)
}
document.getElementById("roundsPlayed").innerHTML = `Rounds Played = ${parseInt(localStorage.getItem("roundsPlayed"))}`;
if(localStorage.getItem("lifetimeScore") == undefined){
    localStorage.setItem("lifetimeScore", 0)
}
document.getElementById("lifetimeScore").innerHTML = `Lifetime Score = ${parseInt(localStorage.getItem("lifetimeScore"))}`;
window.onresize = style;
function style() {
    var dot = document.getElementById("dot");
    var dotText = document.getElementById("dotText");
    var containerLeft = document.getElementById("containerLeft");
    var containerRight = document.getElementById("containerRight");
    var stats = document.getElementById("stats");
    var statsButtonText = document.getElementById("statsButtonText");
    var statsPadding = 40;
    dot.style.left = `calc(50vw - ${dot.offsetWidth / 2}px)`;
    dot.style.top = `calc(50vh - ${dot.offsetHeight / 2}px)`;
    containerLeft.style.top = `calc(30vh - ${containerLeft.offsetHeight / 2}px)`;
    containerRight.style.top = `calc(30vh - ${containerRight.offsetHeight / 2}px)`;
    dotText.style.fontSize = `${(dot.offsetWidth / score.toString().length) + (score.toString().length - 1) * 5}px`;
    dotText.style.top = `${(dot.offsetHeight / 2) - (dotText.offsetHeight / 2)}px`;
    dotText.style.left = `${(dot.offsetWidth / 2) - (dotText.offsetWidth / 2)}px`;
    stats.style.padding = `${statsPadding}px`
    stats.style.width = `calc(100vw - ${2 * statsPadding}px)`
    stats.style.height = `calc(100vh - ${2 * statsPadding}px)`
    statsButtonText.style.fontSize = scaleMin("4.5vw", "9vh");
    statsButtonText.style.top = `calc(5vh - ${document.getElementById("statsButtonText").offsetHeight / 2}px)`
    statsButtonText.style.left = `calc(7.5vw - ${document.getElementById("statsButtonText").offsetWidth / 2}px)`
}
function scaleMin(width, height) {
    var test = document.getElementById("test");
    test.hidden = false;
    test.style.width = width
    test.style.height = height
    if(test.offsetWidth <= test.offsetHeight) {
        var returnV = test.offsetWidth
    }
    else {
        var returnV = test.offsetHeight
    }
    test.hidden = true;
    return returnV
}
function startGame(initial){
    var all = document.querySelectorAll('*');
    document.getElementById("rightOverlay").style.backgroundColor = null;
    document.getElementById("leftOverlay").style.backgroundColor = null;
    for(var i=0;i<all.length;i++){ //Defaults all elements pointerEvents
        all[i].style.pointerEvents = null;
    }
    if(initial == true) {
        itemIndex = Math.floor(Math.random() * gameItems.length);
    }
    else {
        itemPrev = itemIndex;
        itemIndex = itemIndex2;
    }
    while(true) {
        itemIndex2 = Math.floor(Math.random() * gameItems.length);
        if (itemIndex2 != itemIndex && itemIndex2 != itemPrev) {
            break;
        }
    }
    var imageLLoaded = false;
    var imageRLoaded = false;
    var imageL = new Image();
    imageL.addEventListener('load', imageLListener = function() {
        document.getElementById("left").style.backgroundImage = `url(${gameItems[itemIndex].url})`;
        imageL.removeEventListener("load", imageLListener);
        imageL.remove();
        imageLLoaded = true;
        if(initial == true && imageRLoaded == true) {
            var startup = document.getElementById("startup")
            startup.style.animationName = "startupFadeout";
            startup.addEventListener("animationend", startupListener = function(){
                startup.removeEventListener("animationend", startupListener)
                startup.style.backgroundColor = "rgba(0, 0, 0, 0)"
                startup.style.animationName = "idle";
            });
        }
    });
    imageL.src = gameItems[itemIndex].url;
    var imageR = new Image();
    imageR.addEventListener('load', imageRListener = function() {
        document.getElementById("right").style.backgroundImage = `url(${gameItems[itemIndex2].url})`;
        imageR.removeEventListener("load", imageRListener);
        imageR.remove();
        imageRLoaded = true;
        if(initial == true && imageLLoaded ==  true) {
            var startup = document.getElementById("startup")
            startup.style.animationName = "startupFadeout";
            startup.addEventListener("animationend", startupListener = function(){
                startup.removeEventListener("animationend", startupListener)
                startup.style.backgroundColor = "rgba(0, 0, 0, 0)"
                startup.style.animationName = "idle";
            });
        }
    });
    imageR.src = gameItems[itemIndex2].url;
    document.getElementById("item1").innerHTML = gameItems[itemIndex].name;
    document.getElementById("item2").innerHTML = gameItems[itemIndex2].name;
}
function checkAnswer(option){
    if(gameItems[itemIndex].value < gameItems[itemIndex2].value) {
        if(option == "right") {
            score++;
            localStorage.setItem("lifetimeScore", parseInt(localStorage.getItem("lifetimeScore")) + 1)
            document.getElementById("lifetimeScore").innerHTML = `Lifetime Score = ${localStorage.getItem("lifetimeScore")}`;
        }
        else {
            score = 0;
        }
        fadeColor(1250, "Green", "right");
        fadeColor(1250, "Red", "left");
    }
    else if (gameItems[itemIndex].value > gameItems[itemIndex2].value) {
        if(option == "left") {
            score++;
            localStorage.setItem("lifetimeScore", parseInt(localStorage.getItem("lifetimeScore")) + 1)
            document.getElementById("lifetimeScore").innerHTML = `Lifetime Score = ${localStorage.getItem("lifetimeScore")}`;
        }
        else {
            score = 0;
        }
        fadeColor(1250, "Red", "right");
        fadeColor(1250, "Green", "left");
    }
	else if(gameItems[itemIndex].value == gameItems[itemIndex2].value) {
        console.log("Win");
        score = score + 1;
        fadeColor(1250, "Green", "both");
	}
    document.getElementById("dotText").innerHTML = score;
    style()
    var all = document.querySelectorAll('*');
    for(var i=0;i<all.length;i++){ //Sets all elements to be unclickable
        all[i].style.pointerEvents = "none";
    }
    if(score > parseInt(localStorage.getItem("bestScore"))) {
        localStorage.setItem("bestScore", score)
        document.getElementById("bestScore").innerHTML = `Highscore = ${localStorage.getItem("bestScore")}`;
    }
    localStorage.setItem("roundsPlayed", parseInt(localStorage.getItem("roundsPlayed")) + 1);
    document.getElementById("roundsPlayed").innerHTML = `Rounds Played = ${localStorage.getItem("roundsPlayed")}`;
    setTimeout(() => {
        blackout(1000)
    }, 1000)
}
function blackout(time) {
    var all = document.querySelectorAll('*');
    document.getElementById("blackout").style.animationDuration = `${time}ms`;
    document.getElementById("blackout").style.animationPlayState = "running";
    setTimeout(() => {
        startGame(false);
    }, time / 4);
    setTimeout(() => {
        document.getElementById("blackout").style.animation = "none";
        document.getElementById("blackout").offsetHeight;
        document.getElementById("blackout").style.animation = null;
        for(var i=0;i<all.length;i++){ //Defaults all elements pointerEvents
            all[i].style.pointerEvents = null;
        }
    }, time);
}
function fadeColor(time, color, side) {
    var right = document.getElementById(`rightOverlay`)
    var left = document.getElementById(`leftOverlay`)
    var selected = document.getElementById(`${side}Overlay`)
    if(side != "both") {
        selected.style.animationName = `fade${color}`
        selected.style.animationDuration = `${time}ms`;
        selected.style.animationPlayState = "running";
        setTimeout(() => {
            selected.style.animation = "none";
            selected.offsetHeight;
            selected.style.animation = null;
        }, time);
    }
    else {
        left.style.animationName = `fade${color}`
        left.style.animationDuration = `${time}ms`;
        left.style.animationPlayState = "running";
        right.style.animationName = `fade${color}`
        right.style.animationDuration = `${time}ms`;
        right.style.animationPlayState = "running";
        setTimeout(() => {
            left.style.animation = "none";
            left.offsetHeight;
            left.style.animation = null;
            right.style.animation = "none";
            right.offsetHeight;
            right.style.animation = null;
        }, time);
    }
}
function statsPanel() {
    var stats = document.getElementById("stats");
    stats.addEventListener("animationend", statsListener = function(){
        if(statsState == false) {
            stats.style.top = "0";
            statsState = true;
        }
        else {
            stats.style.top = "100vh";
            statsState = false;
        }
        stats.removeEventListener("animationend", statsListener)
        stats.style.animationName = "idle";
    });
    if(statsState == false) {
        stats.style.animationName = "statsSlide" 
    }
    else {
        stats.style.animationName = "statsSlideBack"
    }
}
function statsButton() {
    var stats = document.getElementById("statsButton");
    stats.setAttribute("onClick", "" );
    stats.style.cursor = "default";
    stats.addEventListener("animationend", statsButtonListener = function(){
        if(statsButtonState == false) {
            stats.style.bottom = "90%";
            stats.style.borderRadius = "0px 0px 0px 30px";
            stats.style.backgroundColor = "#222";
            statsButtonState = true;
        }
        else {
            stats.style.bottom = "100%";
            stats.style.borderRadius = "30px 0px 0px 0px";
            stats.style.backgroundColor = "#000";
            statsButtonState = false;
        }
        stats.removeEventListener("animationend", statsButtonListener)
        stats.style.animationName = "idle";
        stats.setAttribute("onClick", "statsPanel(); statsButton();" );
        stats.style.cursor = "pointer";
    });
    if(statsButtonState == false) {
        stats.style.animationName = "statsButtonSlide"
    }
    else {
        stats.style.animationName = "statsButtonSlideBack"
    }
}
style()
startGame(true)