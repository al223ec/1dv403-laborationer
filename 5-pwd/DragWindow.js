"use strict";

function DragWindow(windowHandler) {
    var windowDiv = document.createElement("div");
    var drag = document.createElement("div");
    var header = document.createElement("h4");
    var closeButton = document.createElement("input");
    var footer = document.createElement("footer");
    var text;
    var restoreWidth;
    var restoreHeight;

    this.add = function (windowName) {
        closeButton.type = "button";
        closeButton.value = "X";
        closeButton.className = "close";

        text = document.createTextNode("Information");

        drag.className = "drag";
        drag.appendChild(closeButton);

        closeButton.onclick = function (e) {
            windowHandler.removeWindow(drag);
        };

        header.appendChild(document.createTextNode(windowName));
        header.className = "windowName";
        windowDiv.className = "windowDiv";

        footer.appendChild(text);

        drag.appendChild(header);
        drag.appendChild(windowDiv);

        drag.appendChild(footer);
        return drag;
    };

    this.minimize = function () {
        restoreWidth = drag.offsetWidth;
        restoreHeight = drag.offsetHeight;
    };

    this.restore = function () {

    }; 
}; 