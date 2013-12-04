"use strict";
function MemoryBrick(imgId) {
    var imgHolder = document.createElement("img");
    imgHolder.className = "brick";

    this.init = function () {
        imgHolder.src = 'pics/0.png';
        return imgHolder;
    };

    this.getImage = function () {
        return imgHolder; 
    }; 
    
    this.flip = function () {
        imgHolder.src = 'pics/' + imgId + '.png';
    };

    this.reset = function () {
        imgHolder.src = 'pics/0.png';
    };

    this.getImageId = function () {
        return imgId;
    };
}
