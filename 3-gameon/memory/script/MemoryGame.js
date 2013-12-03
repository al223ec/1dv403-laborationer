"use strict";
function MemoryGame(main, row, col) {
    this.init = function () {
        var gameDiv = document.createElement("div");
        var table = document.createElement("table");
        var caption = document.createElement("caption");
        var heading = document.createElement("h3");
        var headingText = document.createTextNode("Memory game");

        heading.appendChild(headingText);
        caption.appendChild(heading);
        table.appendChild(caption);
        table.appendChild(document.createElement("tbody"));

        gameDiv.className = "large-9 columns";
        table.className = "large-12";

        for (var i = 0; i < row; i += 1) {
            var tr = document.createElement("tr"); 
            for (var j = 0; j < col; j += 1){
                var td = document.createElement("td");
                td.appendChild(document.createTextNode("Text"));
                tr.appendChild(td); 
            }
            table.appendChild(tr); 
        }

        gameDiv.appendChild(table);
        main.appendChild(gameDiv);
        console.log("test");
    };
};
window.onload = function () {
    var main = document.querySelector("main");
    var memoGame = new MemoryGame(main, 8, 8);
    memoGame.init();

}; 