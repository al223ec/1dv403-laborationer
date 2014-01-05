"use strict";
function MemoryGame() {
    var gameContainer = document.createElement("div");
    var click;
    var previousImage;
    var currentImage;
    var numOfMoves; 
    var numOfSolvedBricks;
    var numOfBricks; 
 
    var that = this;

    this.init = function () {
        initGame(gameContainer);
        gameContainer.className = "gameContainer";

        return gameContainer;
    };

    function initGame(row, col) {
        if (!row || !col) {
            row = 4;
            col = 4; 
        }
        gameContainer.innerHTML = '';
        click = 0;
        previousImage = null;
        currentImage = null;
        numOfMoves = 0;
        numOfSolvedBricks = 0;

        var pictureArray = RandomGenerator.getPictureArray(row, col);

        numOfBricks = row * col;
        
        for (var i = 0; i < numOfBricks; i += 1) {
            var brick = new MemoryBrick(pictureArray[i], that);
            gameContainer.appendChild(brick.init());
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
                confirm("Grattis du har löst memory spelet, du gjorde det på " + numOfMoves + " försök!!!");
                initGame(gameContainer);
            }
        }
        click = 0;
    };
};

MemoryGame.prototype.toString = function () {
    return "MemoryGame"; 
};
