"use strict";
var PWD = {//statiska objektet som startar applikationen
    //Denna klass ska sk�ta hanteringen av vilka applikationer som ska startas.
    main: document.querySelector("main"),
    width: 1920,
    height: 946,
    init: function () {
        //intiera alla objekt h�r
        var dragDrop = new DragDrop(this);
        var windowCreator = new WindowCreator(this);
        //B�r kanske ha en windowHandler klass, sk�ta allt med f�nster i den
        var imageA = document.querySelector(".appImage");
        var that = this; 
        imageA.onclick = function () {
            that.main.appendChild(windowCreator.add());
        }; 
        dragDrop.init();
    },
    addWindow: function (windowType) {

    },
    removeWindow: function (thatWindow) {
        this.main.removeChild(thatWindow);
    }
};

window.onload = function () {

    PWD.init();
};