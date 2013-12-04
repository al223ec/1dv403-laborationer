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
        imgHolder.style.transform = "skewX(5deg)";
        //imgHolder.style.transition = "height 0.2s linear 0s";
        //imgHolder.style.height = "100%";
    };

    this.reset = function () {
        imgHolder.style.transition = '';
        imgHolder.style.height = '';
        imgHolder.src = 'pics/0.png';
    }

    this.getImageId = function () {
        return imgId;
    };
}
