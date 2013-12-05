"use strict";

function MemoryGame(gameContainer, row, col) {    // gameContainer Används för att ta bort mousedown lyssnaren
    var gameBricks;
    var click; 
    var previousImage;
    var currentImage;
    var numOfMoves; 
    var numOfSolvedBricks;
    var table;

    var that = this;

    this.init = function () {
        gameBricks = [];
        click = 0;
        previousImage = null;
        currentImage = null;
        numOfMoves = 0;
        numOfSolvedBricks = 0;
        var gameDiv = document.createElement("div");
        table = document.createElement("table");
        
        gameDiv.className = "large-9 columns";
        table.className = "large-12";

        initGame(table);
        gameDiv.appendChild(table);
        gameContainer.appendChild(gameDiv);
    };

    function initGame(table) {
        table.innerHTML = '';
        var caption = document.createElement("caption");
        var heading = document.createElement("h3");
        var headingText = document.createTextNode("Memory game");

        heading.appendChild(headingText);
        caption.appendChild(heading);
        table.appendChild(caption);
        table.appendChild(document.createElement("tbody"));

        var pictureArray = RandomGenerator.getPictureArray(row, col);
        var picIndex = 0;

        for (var i = 0; i < row; i += 1) {
            var tr = document.createElement("tr");
            for (var j = 0; j < col; j += 1) {
                var td = document.createElement("td");
                var brick = new MemoryBrick(pictureArray[picIndex], that);
                gameBricks.push(brick);
                td.appendChild(brick.init());
                tr.appendChild(td);
                picIndex++;
            }
            table.appendChild(tr);
        }

    };

    this.clicket = function (memoryBrick) {
        if (currentImage !== null && previousImage !== null) { //Under tiden som användaren har vänt upp två kort ska inte denna funktion fungera
            return; 
        }

        click += 1;
        if (click < 2) {
            previousImage = memoryBrick;
            previousImage.flip();
            return;
        }

        if (click >= 2) {
            currentImage = memoryBrick;
            currentImage.flip();

            if (currentImage == null || previousImage == null) {
                return;
            }
            if (currentImage.getImageId() === previousImage.getImageId() && currentImage !== previousImage) {
                numOfSolvedBricks += 1;
                numOfMoves += 1;
                currentImage = null;
                previousImage = null;
            } else if (currentImage !== previousImage) {
                setTimeout(function () {
                    currentImage.reset();
                    previousImage.reset();
                    currentImage = null;
                    previousImage = null;
                }, 500);
                numOfMoves += 1;
            } else { //Användaren har tryckt på samma bild som tidigare
                click -= 1;
                currentImage = null; 
                return;
            }

            if (numOfSolvedBricks >= (gameBricks.length / 2)) {
                console.log("Grattis du har löst memory spelet, du gjorde det på " + numOfMoves + " försök, spela igen?");
                //if (confirm("Grattis du har löst memory spelet, du gjorde det på " + numOfMoves + " försök, spela igen?")) {
                //   // initGame(table);
                //}
                //else {
                //    gameContainer.innerHTML = ''; //Ifall man vill att spelet ska försvinna
                //}
            }
            click = 0;
        }
    };
};
window.onload = function () {
    var games = document.querySelector("#games"); 
    var div = document.createElement("div");
    var memoGame = new MemoryGame(div, 4, 4);
    memoGame.init();
    games.appendChild(div);

    var div1 = document.createElement("div");

    var memoGame2 = new MemoryGame(div1, 2, 2);
    games.appendChild(div1);
    memoGame2.init();
}; 