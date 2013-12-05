"use strict";

function MemoryGame(gameContainer, row, col) {    // gameContainer Anv�nds f�r att ta bort mousedown lyssnaren
    var gameBricks;
    var click; 
    var previousImage;
    var currentImage;
    var numOfMoves; 
    var numOfSolvedBricks;
    var boardDiv;

    var that = this;

    this.init = function () {
        var gameDiv = document.createElement("div");
        boardDiv = document.createElement("div");
        
        gameDiv.className = "large-9 columns";
        boardDiv.className = "large-12";

        initGame(boardDiv);
        gameDiv.appendChild(boardDiv);
        gameContainer.appendChild(gameDiv);
    };

    function initGame(boardDiv) {
        boardDiv.innerHTML = '';
        gameBricks = [];
        click = 0;
        previousImage = null;
        currentImage = null;
        numOfMoves = 0;
        numOfSolvedBricks = 0;

        var caption = document.createElement("caption");
        var heading = document.createElement("h3");
        var headingText = document.createTextNode("Memory game");

        heading.appendChild(headingText);

        var pictureArray = RandomGenerator.getPictureArray(row, col);
        var picIndex = 0;
        boardDiv.appendChild(heading);

        for (var i = 0; i < row; i += 1) {
            for (var j = 0; j < col; j += 1) {
                var brick = new MemoryBrick(pictureArray[picIndex], that);
                gameBricks.push(brick);
                boardDiv.appendChild(brick.init());
                picIndex++;
            }
        }

    };

    this.clicket = function (memoryBrick) {
        if (currentImage !== null && previousImage !== null) { //Under tiden som anv�ndaren har v�nt upp tv� kort ska inte denna funktion fungera
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
            numOfMoves++;

            if (currentImage.getImageId() === previousImage.getImageId() && currentImage !== previousImage) {
                numOfSolvedBricks += 1;
                currentImage = null;
                previousImage = null;
            } else if (currentImage !== previousImage) {
                setTimeout(function () {
                    currentImage.reset();
                    previousImage.reset();
                    currentImage = null;
                    previousImage = null;
                }, 500);
            } else { //Anv�ndaren har tryckt p� samma bild som tidigare
                click -= 1;
                currentImage = null; 
                return;
            }

            if (numOfSolvedBricks >= (gameBricks.length / 2)) {
                if (confirm("Grattis du har l�st memory spelet, du gjorde det p� " + numOfMoves + " f�rs�k, spela igen?")) {
                    initGame(boardDiv);
                }
                else {
                    gameContainer.innerHTML = ''; //Ifall man vill att spelet ska f�rsvinna
                }
            }

            click = 0;
        }
    };
};
window.onload = function () {
    var games = document.querySelector("#games"); 
    var div = document.createElement("div");
    div.className = "gameContainer"; 
    var memoGame = new MemoryGame(div, 4, 4);
    memoGame.init();
    games.appendChild(div);

    var div1 = document.createElement("div");

    var memoGame2 = new MemoryGame(div1, 2, 2);
    games.appendChild(div1);
    memoGame2.init();
}; 