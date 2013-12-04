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
        gameContainer.onmousedown = OnMouseDown;
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
                var brick = new MemoryBrick(pictureArray[picIndex]);
                gameBricks.push(brick);
                td.appendChild(brick.init());
                tr.appendChild(td);
                picIndex++;
            }
            table.appendChild(tr);
        }

    }

    function OnMouseDown(e) {
        if (!e) { e = window.event; }
        if (!(e.target.className == 'brick')) {
            return;
        }

        click += 1;
        if (click < 2) {
            for (var i = 0; i < gameBricks.length; i += 1) {
                if (e.target === gameBricks[i].getImage()) {
                    previousImage = gameBricks[i]; 
                    previousImage.flip();
                }
            }
            return;
        }

        if (click >= 2) {
            for (var i = 0; i < gameBricks.length; i += 1) {
                if (e.target === gameBricks[i].getImage()) {
                    currentImage = gameBricks[i];
                    currentImage.flip();
                }
            }
            if (currentImage == null || previousImage == null) {
                return;
            }
            if (currentImage.getImageId() === previousImage.getImageId() && currentImage !== previousImage) {
                numOfSolvedBricks += 1;
            } else if (currentImage !== previousImage) {
                gameContainer.onmousedown = null; //Ta bort denna under tiden som spelet visar brickorna
                setTimeout(function () {
                    currentImage.reset();
                    previousImage.reset();
                    currentImage = null;
                    previousImage = null;
                    gameContainer.onmousedown = OnMouseDown; //Återställer mousdownlyssnaren när tiden är slut
                }, 500);
            } else { //Användaren har tryckt på samma bild som tidigare
                click -= 1;
                return;
            }
          
            if (numOfSolvedBricks >= (gameBricks.length / 2)) {
                if (confirm("Grattis du har löst memory spelet, du gjorde det på " + numOfMoves + " försök, spela igen?")) {
                    initGame(table);
                }
                else {
                    gameContainer.innerHTML = ''; //Ifall man vill att spelet ska försvinna
                }
            }
            numOfMoves += 1;
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