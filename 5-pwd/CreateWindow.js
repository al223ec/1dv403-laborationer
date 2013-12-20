"use strict";
function WindowCreator(PWD) {
    var that = this;

    this.add = function (content) {
       // if (!main) { main = document.querySelector("main"); }

        var windowDiv = document.createElement("div");
        var drag = document.createElement("div"); 
        var header = document.createElement("h4");
        var closeButton = document.createElement("input");
        var footer = document.createElement("footer");
        var text = document.createTextNode("Information");

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

        footer.appendChild(text); 

        drag.appendChild(header);
        drag.appendChild(windowDiv);

        drag.appendChild(footer); 
        return drag;
    }

    this.removeWindow = function (windowToRemove) {
        windowToRemove.parentNode.removeChild(windowToRemove);
    }
}; 

