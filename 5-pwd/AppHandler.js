"use strict";
var AppHandler = {
    dragWindows: [],
    numberOfWindows: 0,

    width: 0,
    height: 0,
    main: null,

    init: function (width, height, main) {
        var that = this;
        that.main = main; 
        that.width = width;
        that.height = height;

        that.dragWindows.push(['ImageGallery']);
        that.dragWindows.push(['MemoryGame']);
        that.dragWindows.push(["LabbyMessage"]);
    },

    add: function (app) {
        var that = this;

        var newWindow = new DragWindow(that);
        for (var i = 0; i < that.dragWindows.length; i++) {
            if (that.dragWindows[i][0] === app.toString()) {
                that.dragWindows[i].push(newWindow);
                that.main.appendChild(newWindow.add(app.toString() + that.numberOfWindows++, app));
                that.fixBounds(newWindow.getDragDiv());
                break;
            }
        }
    },

    addImageWindow: function (imgGallery, img) {
        var that = this;
        for (var i = 0; i < that.dragWindows[0].length; i++) {
            if (imgGallery == that.dragWindows[0][i]) {
                var newWindow = new DragWindow(that);
                imgGallery.addWindow(newWindow);
                that.main.appendChild(newWindow.add("Image", img));
            }
        }
    },

    removeWindow: function (div, windowToRemove) {
        var that = this;
        for (var i = 0; i < that.dragWindows.length; i++) {
            for (var j = 0; j < that.dragWindows[i].length; j++) {
                if (that.dragWindows[i][j] === windowToRemove) {
                    that.dragWindows[i].splice(j, 1);
                }
            }
        }
        div.parentNode.removeChild(div);
    },

    fixBounds: function (div) {
        var allDragDivElements = document.querySelectorAll(".drag");
        if ((50 + 20 * this.numberOfWindows +  + div.offsetHeight) < this.height) {
            div.style.top = 500 + 20 * this.numberOfWindows + 'px';
        } 
        if ((50 + 20 * this.numberOfWindows + div.offsetWidth) < this.width) {
            div.style.left = 500 + 20 * this.numberOfWindows + 'px';
        }
    },
};

var DisplayMeny = {
    main: document.querySelector("main"),
    init: function (listItems, e) { //Skicka med a taggar
        e.preventDefault();
        if (!typeof listItems == 'object') { //HUr lösa detta?
            throw Error("Skicka object"); 
        }

        var that = this;
        var div = document.createElement("div");
        div.className = "rightClickMenu";

        var ul = document.createElement("ul");

        for (var i = 0; i < listItems.length; i++) {
            var li = document.createElement("li");
            li.appendChild(listItems[i]);
            ul.appendChild(li); 
        }

        div.appendChild(ul);

        div.style.top = e.pageY + 'px';
        div.style.left = e.pageX + 'px';

        div.onmouseleave = function () {
            that.main.removeChild(div);
        };
        that.main.appendChild(div);
    },
}; 