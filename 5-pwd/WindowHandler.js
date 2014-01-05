"use strict";
var WindowHandler = {
    dragWindows: [],
    numberOfWindows: 0,
    bounds: 0,
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
        that.dragWindows.push(["app2"]);
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
        if ((50 + 20 * this.numberOfWindows + div.offsetHeight) < this.height) {
            div.style.top = 50 + 20 * this.numberOfWindows + 'px';
            this.bounds = this.numberOfWindows; 
        } else {
        }
        div.style.left = 50 + 20 * this.numberOfWindows + 'px';
    },
};

function Meny() { //Vart ska denna vara? 
    this.view = function () {
    }; 
}; 