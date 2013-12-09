"use strict";
function MemoryBrick(imgId, memoryGame) {
    var brickContainer = document.createElement("div");
    var brickFlipper = document.createElement("div");
    var front = document.createElement("div");
    var back = document.createElement("div");

    var that = this; 
    brickContainer.onclick = function () {
        memoryGame.brickIsClicked(that);
    };

    this.init = function () {
        brickContainer.className = "flip-container";
        brickFlipper.className = "flipper";
        front.className = "front";
        back.className = "back";
        //var a = document.createElement("a");
        //var img = document.createElement("img");
        //img.src = "pics/0.png";
        //a.appendChild(img);
        brickFlipper.appendChild(front);
        brickFlipper.appendChild(back);
        brickContainer.appendChild(brickFlipper);

        back.style.backgroundImage = "url(pics/" + imgId + ".png)";
        return brickContainer;
    };

    this.getDiv = function () {
        return brickContainer;
    };

    this.flip = function () {
        brickContainer.onclick = null; //Tar bort click event medans bilden är flippad
        brickContainer.classList.toggle('flip');
     };

    this.reset = function () {
        brickContainer.classList.toggle('flip');
        brickContainer.onclick = function () {
            memoryGame.brickIsClicked(that);
        };
    };

    this.getImageId = function () {
        return imgId;
    };
}
