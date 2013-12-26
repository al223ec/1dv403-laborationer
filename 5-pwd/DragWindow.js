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

        drag.style.width = '0px';
        drag.style.height = '0px'; 
    };

    this.restore = function () {}; 
}; 