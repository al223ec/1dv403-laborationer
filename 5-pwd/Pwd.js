"use strict";
var PWD = {//statiska objektet som startar applikationen
    //Denna klass ska sk�ta hanteringen av vilka applikationer som ska startas.
    main: document.querySelector("main"),
    width: 1920,
    height: 946,

    init: function () {
        //intiera alla objekt h�r
        var dragDrop = new DragDrop(this);
        var windowHandler = new WindowHandler(this);
        var that = this;

        //Ska jag hantera dessa fr�n scripten?
        var imageGallery = document.querySelector(".appImage");
        imageGallery.onclick = function () {
            that.main.appendChild(windowHandler.add(new ImageGallery()));
        };

        var memory = document.querySelector(".appMemory");
        memory.onclick = function () {
            that.main.appendChild(windowHandler.add(new MemoryGame()));
        };


        dragDrop.init();
    }
};

Object.prototype.getName = function () {
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec((this).constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
};

window.onload = function () {
    PWD.init();
};