"use strict";
function ImageGallery() {

    this.init = function () {
        return document.createElement("div");
    };
};
ImageGallery.prototype.toString = function () {
    return "ImageGallery";
};