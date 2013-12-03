"use strict";

function MemoryBrick(img) {
    var _img = img; 
    this.getBrickLink = function () {
        var imgHolder = document.createElement("img"); 
        var link = document.createElement("a");
        imgHolder.src = 'pics/0.png';
        link.appendChild(imgHolder);
        return link; 
    }
    this.getImageLink = function () {
        var imgHolder = document.createElement("img");
        imgHolder.className = "brick"; 
        var link = document.createElement("a");
        imgHolder.src = 'pics/' + _img + '.png';
        link.appendChild(imgHolder);
        return link;
    }
    
}
MemoryBrick.prototype.getBrickLink = function () {
    var imgHolder = document.createElement("img");
    var link = document.createElement("a");
    imgHolder.src = 'pics/0.png';
    link.appendChild(imgHolder);
    return link;
};
MemoryBrick.prototype.getImgId = function () {
    return this._img;
}; 