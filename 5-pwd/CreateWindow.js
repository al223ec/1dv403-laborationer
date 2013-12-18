"use strict";

var CreateWindow = {
    add: function (main, content) {
        if (!main) { main = document.querySelector("main"); }

        var windowDiv = document.createElement("div");
        var topBar = document.createElement("div"); 
        var header = document.createElement("h4");
        var closeButton = document.createElement("input");

        closeButton.type = "button";
        closeButton.value = "X";
        closeButton.className = "close";

        topBar.className = "topBar";
        topBar.appendChild(closeButton);

        closeButton.onclick = function (e) {
            if (!confirm("Vill du stänga detta fönster")) {
                return;
            }
            removeBoard(topBar);
        };

        header.appendChild(document.createTextNode("Fönster"));
        windowDiv.className = "board";
        windowDiv.appendChild(header);
        topBar.appendChild(windowDiv);
        main.appendChild(topBar);

    }

}; 

