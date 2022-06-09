var itemIndex;
var itemIndex2;
var itemPrev;
var score = 0;
var statsState = false;
var statsButtonState = false;
var bestScore = parseInt(localStorage.getItem("bestScore"));
if(bestScore == undefined){
    bestScore = 0
    localStorage.setItem("bestScore", bestScore)
}
if(localStorage.getItem("roundsPlayed") == undefined){
    localStorage.setItem("roundsPlayed", 0)
}
window.onresize = style;
function style() {
    var dot = document.getElementById("dot");
    var dotText = document.getElementById("dotText");
    var containerLeft = document.getElementById("containerLeft");
    var containerRight = document.getElementById("containerRight");
    dot.style.left = `calc(50vw - ${dot.offsetWidth / 2}px)`;
    dot.style.top = `calc(50vh - ${dot.offsetHeight / 2}px)`;
    containerLeft.style.top = `calc(30vh - ${containerLeft.offsetHeight / 2}px)`;
    containerRight.style.top = `calc(30vh - ${containerRight.offsetHeight / 2}px)`;
    dotText.style.top = `${(dot.offsetHeight / 2) - (dotText.offsetHeight / 2)}px`;
    dotText.style.left = `${(dot.offsetWidth / 2) - (dotText.offsetWidth / 2)}px`;
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
    document.getElementById("item1").innerHTML = gameItems[itemIndex].name;
    document.getElementById("left").style.backgroundImage = `url(${gameItems[itemIndex].url})`;
    document.getElementById("item2").innerHTML = gameItems[itemIndex2].name;
    document.getElementById("right").style.backgroundImage = `url(${gameItems[itemIndex2].url})`;
}
function checkAnswer(option){
    if(gameItems[itemIndex].value < gameItems[itemIndex2].value) {
        if(option == "right") {
            score = score + 1;
            console.log("Win");
        }
        else {
            score = 0;
            console.log("Lose");
        }
        fadeColor(1250, "Green", "right");
        fadeColor(1250, "Red", "left");
    }
    else if (gameItems[itemIndex].value > gameItems[itemIndex2].value) {
        if(option == "left") {
            score++;
            console.log("Win");
        }
        else {
            score = 0;
            console.log("Lose");
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
    if(score > bestScore) {
        localStorage.setItem("bestScore", score)
        bestScore = score;
    }
    localStorage.setItem("roundsPlayed", parseInt(localStorage.getItem("roundsPlayed")) + 1);
    setTimeout(() => {
        blackout(1000)
    }, 1000)
}
function blackout(time) {
    var all = document.querySelectorAll('*');
    document.getElementById("blackout").style.animationDuration = `${time}ms`;
    document.getElementById("blackout").style.animationPlayState = "running";
    setTimeout(() => {
        document.getElementById("item1").innerHTML = `${gameItems[itemIndex].value} Million`
        document.getElementById("item2").innerHTML = `${gameItems[itemIndex2].value} Million`
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
    stats.style.animationPlayState = "running";
    statsButton()
    setTimeout(() => {
        stats.style.animation = "none";
        stats.offsetHeight;
        stats.style.animation = null;
        if(statsState == false) {
            stats.style.animationName = "statsSlideBack"
            statsState = true;
            
        }
        else {
            stats.style.animationName = "statsSlide"
            statsState = false;
        }
    }, 1000);
}
function statsButton() {
    var stats = document.getElementById("statsButton");
    stats.style.animationPlayState = "running";
    setTimeout(() => {
        stats.style.animation = "none";
        stats.offsetHeight;
        stats.style.animation = null;
        if(statsButtonState == false) {
            stats.style.animationName = "statsButtonSlideBack"
            statsButtonState = true;
        }
        else {
            stats.style.animationName = "statsButtonSlide"
            statsButtonState = false;
        }
    }, 1000);
}
style()
document.getElementById("stats").style.top = "0px"
startGame(true)