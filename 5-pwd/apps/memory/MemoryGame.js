"use strict";
function MemoryGame() {
    var row = 4, col = 4; 
    var gameContainer = document.createElement("div");
    var click;
    var previousImage;
    var currentImage;
    var numOfMoves; 
    var numOfSolvedBricks;
    var numOfBricks; 
    var boardDiv;

    var that = this;

    this.init = function () {
        var gameDiv = document.createElement("div");
        boardDiv = document.createElement("div");
        
        gameDiv.className = "gameContainer";
 
        initGame(boardDiv);
        gameDiv.appendChild(boardDiv);
        gameContainer.appendChild(gameDiv);
        return gameContainer;
    };

    function initGame(boardDiv) {
        boardDiv.innerHTML = '';
        click = 0;
        previousImage = null;
        currentImage = null;
        numOfMoves = 0;
        numOfSolvedBricks = 0;

        var heading = document.createElement("h3");
        var headingText = document.createTextNode("MemoryGame");

        heading.appendChild(headingText);

        var pictureArray = RandomGenerator.getPictureArray(row, col);
        boardDiv.appendChild(heading);

        numOfBricks = row * col;
        
        for (var i = 0; i < numOfBricks; i += 1) {
            var brick = new MemoryBrick(pictureArray[i], that);
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

            if (numOfSolvedBricks >= (numOfBricks / 2)) {
                confirm("Grattis du har löst memory spelet, du gjorde det på " + numOfMoves);
                initGame(boardDiv);
            }
        }
        click = 0;
    };
};
