"use strict";
function MemoryGame(gameContainer, row, col) {    // gameContainer Används för att ta bort mousedown lyssnaren
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
        boardDiv.appendChild(heading);

        var numOfBricks = row * col;

        for (var i = 0; i < numOfBricks; i += 1) {
            var brick = new MemoryBrick(pictureArray[i], that);
            gameBricks.push(brick);
            boardDiv.appendChild(brick.init());
        }

    };

    this.brickIsClicked = function (memoryBrick) {
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
            } else { //Användaren har tryckt på samma bild som tidigare
                click -= 1;
                currentImage = null; 
                return;
            }

            if (numOfSolvedBricks >= (gameBricks.length / 2)) {
                if (confirm("Grattis du har löst memory spelet, du gjorde det på " + numOfMoves + " försök, spela igen?")) {
                    initGame(boardDiv);
                }
                else {
                    gameContainer.innerHTML = ''; //Ifall man vill att spelet ska försvinna gör det här, tillfällig lösning
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

    var memoGame2 = new MemoryGame(div, 2, 2);
    games.appendChild(div);
    memoGame2.init();

    var memoGame3 = new MemoryGame(div, 4, 4);
    memoGame3.init();
    games.appendChild(div);

    var memoGame4 = new MemoryGame(div, 2, 2);
    games.appendChild(div);
    memoGame4.init();
}; 