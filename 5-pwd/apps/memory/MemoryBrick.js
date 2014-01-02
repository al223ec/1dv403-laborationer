"use strict";
function MemoryBrick(imgId, memoryGame) {
    var brickLink = document.createElement("a");
    var brick = document.createElement("img");

    var that = this;
    brickLink.onclick = function () {
        memoryGame.brickIsClicked(that);
    };

    this.init = function () {
        brickLink.href = "#";
        brick.src = "apps/memory/pics/0.png";
        brickLink.appendChild(brick);
        return brickLink;
    };

    this.flip = function () {
        brickLink.onclick = null; //Tar bort click event medans bilden är flippad
        brick.src = "apps/memory/pics/" + imgId + ".png";
     };

    this.reset = function () {
        brick.src = "apps/memory/pics/0.png";
        brickLink.onclick = function () {
            memoryGame.brickIsClicked(that);
        };
    };

    this.getImageId = function () {
        return imgId;
    };
}

//MemoryBrick.prototype.init = function () {
//    brickLink.href = "#";
//    brick.src = "apps/memory/pics/0.png";
//    brickLink.appendChild(brick);
//    return brickLink;
//};