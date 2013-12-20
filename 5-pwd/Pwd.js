"use strict";
var PWD = {//statiska objektet som startar applikationen
    main: document.querySelector("main"),
    init: function () {
        //intiera alla objekt här
        var dragDrop = new DragDrop(this);
        var windowCreator = new WindowCreator(this);
        this.main.appendChild(windowCreator.add());
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