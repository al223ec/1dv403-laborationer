"use strict";
function LabbyMezz () {
    var arrMessageBoards;
    var numOfBoards;
    var main; 

    this.init = function () {
        arrMessageBoards =[];
        numOfBoards = 0; 
        main = document.querySelector("main");
    };
    this.createBoard = function () {
        var newBoard = document.createElement("div");
        var topBar = document.createElement("div");
        var header = document.createElement("h1");
        var closeButton = document.createElement("input");

        closeButton.type = "button";
        closeButton.value = "X";
        closeButton.className = "close";
        var that = this; 
        closeButton.onclick = function (e) { console.log(newBoard); that.removeBoard(newBoard); };

        topBar.className = "large-12 columns topBar";
        topBar.appendChild(closeButton);

        header.appendChild(document.createTextNode("MessageBoard"));
        newBoard.className = "board";
        newBoard.appendChild(topBar);
        newBoard.appendChild(header);
        main.appendChild(newBoard);

        console.log(numOfBoards);
        arrMessageBoards.push(new MessageBoard(newBoard));
        arrMessageBoards[numOfBoards].init();
        numOfBoards++;
    };

    this.removeBoard = function(boardToRemove){
        var boardIndex;
        main.removeChild(boardToRemove);
        arrMessageBoards.map(function (board, index) {
            if (board.newBoard === boardToRemove) {
                boardIndex = index;
            }
        });
        arrMessageBoards.splice(boardIndex, 1);
        numOfBoards--;
    };
};

window.onload = function () {
    var start = document.querySelector("#start");
    var labby = new LabbyMezz();
    labby.init();
    // Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
    start.addEventListener("click", function (e) {
        e.preventDefault(); // Hindra formuläret från att skickas till servern
        labby.createBoard();
    });
};