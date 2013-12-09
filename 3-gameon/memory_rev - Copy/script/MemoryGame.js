"use strict";
function MemoryGame(gameContainer, row, col) {  
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
        
        gameDiv.className = "large-9 columns gameContainer";
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
        var headingText = document.createTextNode("MemoryGame");

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
                    //while (gameContainer.firstChild) {
                    //    gameContainer.removeChild(gameContainer.firstChild);
                    //}
                    //gameContainer.innerHTML = ''; //Ifall man vill att spelet ska f�rsvinna g�r det h�r, tillf�llig l�sning k�nns farligt om man har kvar referenser
                    console.log(document.querySelector("main"));
                    document.querySelector("main").removeChild(gameContainer);
                    console.log(document.querySelector("main"));
                }
            }

            click = 0;
        }
    };
};
window.onload = function () {
    var main = document.querySelector("main")
    var game1 = document.createElement("div");
    var memoGame1 = new MemoryGame(game1, 4, 4);
    memoGame1.init();
    main.appendChild(game1);


    var game2 = document.createElement("div");
    var memoGame2 = new MemoryGame(game2, 2, 2);
    main.appendChild(game2);
    memoGame2.init();

    //var game3 = document.createElement("div");
    //game3.className = "gameContainer";
    //var memoGame3 = new MemoryGame(game3, 4, 4);
    //memoGame3.init();
    //games.appendChild(game3);

}; 