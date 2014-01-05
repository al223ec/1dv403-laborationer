"use strict";
var PWD = {//statiska objektet som startar applikationen
    //Denna klass ska sköta hanteringen av vilka applikationer som ska startas.
    main: document.querySelector("main"),
    width: 1920,
    height: 946,

    init: function () {
        //intiera alla objekt här
        var dragDrop = new DragDrop(this);
        var that = this;
        WindowHandler.init(that.width, that.height);

        //Ska jag hantera dessa från scripten?
        var imageGallery = document.querySelector(".appImage");
        imageGallery.onclick = function () {
            WindowHandler.add(that.main, new ImageGallery());
        };

        var memory = document.querySelector(".appMemory");
        memory.onclick = function () {
            WindowHandler.add(that.main, new MemoryGame());
        };
        dragDrop.init();
    }
};
////http://stackoverflow.com/questions/332422/how-do-i-get-the-name-of-an-objects-type-in-javascript
////Vet inte om jag ska använda denna än
//Object.prototype.getName = function () {
//    var funcNameRegex = /function (.{1,})\(/;
//    var results = (funcNameRegex).exec((this).constructor.toString());
//    return (results && results.length > 1) ? results[1] : "";
//};

//Kan ju använda toString
//window.oncontextmenu = function (e) { //Högerklick 
//    console.log(e);
//    console.log(e.target);
//    return false;     // cancel default menu
//};

window.onload = function () {
    PWD.init();
};