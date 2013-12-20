"use strict";
function WindowCreator(PWD) {
    var that = this;

    this.add = function (content) {
       // if (!main) { main = document.querySelector("main"); }

        var windowDiv = document.createElement("div");
        var drag = document.createElement("div"); 
        var header = document.createElement("h4");
        var closeButton = document.createElement("input");

        closeButton.type = "button";
        closeButton.value = "X";
        closeButton.className = "close";

        drag.className = "drag";
        drag.appendChild(closeButton);

        closeButton.onclick = function (e) {
            that.removeWindow(drag);
            //PWD.removeWindow(drag);
        };

        header.appendChild(document.createTextNode("Fönster"));
        header.className = "windowName";
        windowDiv.className = "windowDiv";
        drag.appendChild(header);
        drag.appendChild(windowDiv);

        return drag;
    }

    this.removeWindow = function (windowToRemove) {
        windowToRemove.parentNode.removeChild(windowToRemove);
    }
}; 

