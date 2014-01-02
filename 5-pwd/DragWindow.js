"use strict";
function DragWindow(WH) {
    var drag = document.createElement("div");
    var text;
    var restoreWidth;
    var restoreHeight;
    var that = this;
    
    this.add = function (windowName, app) {
        if (!app || !app.init) {
            //fel, skicka med en referens till appen som ska öppnas
            throw Error("fel, skicka med en referens till appen som ska öppnas");
        }

        var header = document.createElement("h4");
        var closeButton = document.createElement("input");
        var footer = document.createElement("footer");

        closeButton.type = "button";
        closeButton.value = "X";
        closeButton.className = "close";

        var minimizeButton = document.createElement("input");
        minimizeButton.type = "button";
        minimizeButton.value = "^";
        minimizeButton.className = "minimize"; 

        text = document.createTextNode("Information");

        drag.className = "drag";
        drag.appendChild(minimizeButton);
        drag.appendChild(closeButton);
        
        minimizeButton.onclick = function (e) {
            that.minimize(); 
        };

        closeButton.onclick = function (e) {
            WH.removeWindow(drag, that);
        };

        drag.style.left = '50px';
        drag.style.top = '50px';

        header.appendChild(document.createTextNode(windowName));
        header.className = "windowName"; 

        footer.appendChild(text);
        drag.appendChild(header);

        drag.appendChild(app.init());
        drag.appendChild(footer);
        return drag;
    };

    this.minimize = function () {
        restoreWidth = drag.offsetWidth;
        restoreHeight = drag.offsetHeight;

        that.minimizeHeight(drag);
        that.minimizeWidth(drag);
        that.minimizeTop(drag); 
        //drag.style.width = '0px';
        //drag.style.height = '0px'; 
    };
    this.restore = function () {}; 
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
