"use strict";
var PWD = {//statiska objektet som startar applikationen
    //Denna klass ska sköta hanteringen av vilka applikationer som ska startas.
    main: document.querySelector("main"),
    width: 1920,
    height: 946,
    numOfWindows: 0,

    init: function () {
        //intiera alla objekt här
        new DragDrop(this).init();
        var that = this;

        //Ska jag hantera dessa från scripten?
        var imageGallery = document.querySelector("#appImage");//ID? 
        imageGallery.onclick = function () {
            var newGallery = new ImageGallery();
            that.add(newGallery.start());
            that.numOfWindows++;
        };

        var memory = document.querySelector("#appMemory");
        memory.onclick = function () {
            var mGame = new MemoryGame();
            that.add(mGame.start());
            that.numOfWindows++;
        };

        var messBoard = document.querySelector("#appMessage");
        messBoard.onclick = function () {
            var mBoard = new MessageBoard();
            that.add(mBoard.start());
            that.numOfWindows++;
        };

        var reader = document.querySelector("#appRssReader");
        reader.onclick = function () {
            var reader = new RssReader();
            that.add(reader.start());
            that.numOfWindows++;
        };
        var chat = document.querySelector("#appChat");
        chat.onclick = function () {
            var newChat = new ChatBoard();
            that.add(newChat.start());
            that.numOfWindows++;
        };
      
    },

    add: function (div) {
        this.main.appendChild(div);
        this.fixBounds();
    },

    removeWindow: function (div) {
        this.main.removeChild(div);
    },

    fixBounds: function () {
        var allDragElements = this.main.querySelectorAll(".drag");
        for (var i = 0; i < allDragElements.length; i++) {
            if (allDragElements[i].offsetWidth + +allDragElements[i].style.left.replace(/[^0-9]/g, '') > PWD.width) {
                allDragElements[i].style.left = PWD.width - allDragElements[i].offsetWidth - 40 + 'px';
            }
            if (allDragElements[i].offsetHeight + +allDragElements[i].style.top.replace(/[^0-9]/g, '') > PWD.height) {
                allDragElements[i].style.top = PWD.height - allDragElements[i].offsetHeight - 40 + 'px';
            }
        }
    },
};

window.onload = function () {
    PWD.init();
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
