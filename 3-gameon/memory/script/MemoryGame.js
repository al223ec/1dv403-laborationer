"use strict";
function MemoryGame(main, row, col) {
    var gameBricks = [];
    var click = 0; 
    var previousImage;
    var currentImage;

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

        var pictureArray = RandomGenerator.getPictureArray(row, col);
        var picIndex = 0; 

        for (var i = 0; i < row; i += 1) {
            var tr = document.createElement("tr"); 
            for (var j = 0; j < col; j += 1){
                var td = document.createElement("td");
                var brick = new MemoryBrick(pictureArray[picIndex]);
                gameBricks.push(brick);
                td.appendChild(brick.getImageLink());
                tr.appendChild(td);
                picIndex++;
            }
            table.appendChild(tr); 
        }

        gameDiv.appendChild(table);
        main.appendChild(gameDiv);

        document.onmousedown = OnMouseDown;
    };
    function OnMouseDown(e) {
        if (!(e.target.className == 'brick')) {
            return; 
        }
        click+= 1; 
        if(click < 2){
            previousImage = e.target;
            return;
        }
        if(click >= 2){
            currentImage = e.target; 
            if (currentImage.src == previousImage.src) {
                console.log("rätt");
            } else {
                console.log("fel");
            }
            click = 0; 
        }
    }
};
window.onload = function () {
    var main = document.querySelector("main");
    var memoGame = new MemoryGame(main, 4, 4);
    memoGame.init();
}; 