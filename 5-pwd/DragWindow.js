"use strict";
function DragWindow(WH) {

    var drag = document.createElement("div");
    var restoreWidth;
    var restoreHeight;
    var restoreLeft;
    var restoreTop;

    var that = this;

    this.add = function (windowName, app) {
        if (!app || !app.init) {
            //fel, skicka med en referens till appen som ska öppnas
            throw Error("fel, skicka med en referens till appen som ska öppnas");
        }

        var header = document.createElement("h4");
        var footer = document.createElement("footer");

        var closeButton = document.createElement("input");
        closeButton.type = "button";
        closeButton.value = "X";
        closeButton.className = "close";

        closeButton.onclick = function (e) {
            WH.removeWindow(drag, that);
        };

        var minimizeButton = document.createElement("input");
        minimizeButton.type = "button";
        minimizeButton.value = "^";
        minimizeButton.className = "minimize"; 

        minimizeButton.onclick = function (e) {
            that.minimize();
        };

        drag.className = "drag";
        drag.appendChild(minimizeButton);
        drag.appendChild(closeButton);

        header.appendChild(document.createTextNode(windowName));
        header.className = "windowName"; 

        drag.appendChild(header);
        drag.appendChild(app.init());

        drag.appendChild(footer);
        if (app.setFooter) {
            app.setFooter(footer);
        }

        drag.style.zIndex = 1010;
        return drag;
    };

    this.minimize = function () {
        restoreWidth = +drag.offsetWidth;
        restoreHeight = +drag.offsetHeight;

        restoreLeft = +drag.style.left.replace(/[^0-9]/g, "");//Räknar med att dessa inte har minusvärden
        restoreTop = +drag.style.top.replace(/[^0-9]/g, "");

        that.minimizeHeight(drag);
        that.minimizeWidth(drag);
        that.minimizeTop(drag);

        that.restore(drag, restoreWidth, restoreHeight, restoreTop, restoreLeft);
    };

    this.getDragDiv = function () { return drag; };
};

//Funktion the ultimate
DragWindow.prototype.minimizeHeight = function (div){
    var height = div.offsetHeight;
    var numOfSteps = height / 10;
    function step() {
        div.style.height = height + 'px';
        if (height > 0) {
            height -= numOfSteps;
            setTimeout(step, 5);
        }
    }
    setTimeout(step, 5);
};

DragWindow.prototype.minimizeWidth = function (div) {
    var width = div.offsetWidth;
    var numOfSteps = width / 10;
    function step() {
        div.style.width = width + 'px';
        if (width > 0) {
            width -= numOfSteps;
            setTimeout(step, 5);
        }
    }
    setTimeout(step, 5);
};

DragWindow.prototype.minimizeTop= function (div) {
    var top = +(div.style.top.replace(/[^0-9\-]/g, ''));
    var numOfSteps = top/1;

    function step() {
        div.style.top = top + 'px';
        if (top < (self.innerHeight)) {
            top += numOfSteps;
            setTimeout(step, 1);
        } else {
            div.style.display = 'none';
        }
    }
    setTimeout(step, 1);
};

DragWindow.prototype.restore = function (div, width, height, top, left) {
    if (!div){ 
        throw Error("Skicka med diven som argument"); 
    } else if (!+width || !+height || !+top || !+left) {
        throw Error("Endast nummer som argument");
    }
    console.log(width);
    div.style.height = height + 'px';
    div.style.width = width + 'px';

    div.style.top = top + 'px';
    div.style.left = left + 'px';

    div.style.display = 'block';
};