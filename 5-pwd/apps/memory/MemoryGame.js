"use strict";
PWD.App.MemoryGame = function() {
    PWD.App.call(this);
    var gameContainer = this.container;
    var click;
    var previousImage;
    var currentImage;
    var numOfMoves; 
    var numOfSolvedBricks;
    var numOfBricks = 0; 
 
    var that = this;
    var col, row = PWD.Settings.Memory.cards;

    this.start = function () {
        this.init("Memory spel");
        initGame();
        gameContainer.className = "container memory";
        initDropDown(this.addDropDown("Meny", true));
        this.footer.appendChild(document.createTextNode("Game on MF!!"));
        return this.getDragDiv();
    };

    function initGame(input) {
        if (+input) {
            row = input;
        }
        if (!isNaN(row) && row <= 4 && row > 0 && (row%2) == 0) {
            row = col = row;
        } else {
            row = 4;
            col = 4;
        }
        PWD.Settings.Memory.cards = row;
        gameContainer.innerHTML = '';
        click = 0;
        previousImage = null;
        currentImage = null;
        numOfMoves = 0;
        numOfSolvedBricks = 0;
        numOfBricks = col * row;

        var pictureArray = PWD.App.MemoryGame.RandomGenerator.getPictureArray(row, col);
        for (var i = 0; i < numOfBricks; i += 1) {
            var brick = new PWD.App.MemoryGame.MemoryBrick(pictureArray[i], that);
            gameContainer.appendChild(brick.init());
        }
        //PWD.SaveSettings();
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
                initGame();
            }
        }
        click = 0;
    };

    function initDropDown(div) {
        var links = [{
            text: "Starta om",
            func: function () {
                return function () {
                    return initGame();
                };
            },
        }, {
            text: "Ändra spelplan",
            func: function () {
                return function () {
                    that.getInput("Vg, skriv hur många par spelet ska bestå av, max 4", initGame);
                };
            },
        }];
        
        for (var i = 0; i < links.length; i++) {
            var a = document.createElement("a");
            a.href = "#";
            a.onclick = links[i].func();
            a.appendChild(document.createTextNode(links[i].text));
            div.appendChild(a);
        }

    };
};
PWD.App.MemoryGame.prototype = Object.create(PWD.App.prototype);
PWD.App.MemoryGame.prototype.toString = function () {
    return "MemoryGame"; 
};
