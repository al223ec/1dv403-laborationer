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

        topBar.className = "drag";
        topBar.appendChild(closeButton);
        topBar.style.left = '0pt';
        topBar.style.top = '0pt';
        var that = this;
        closeButton.onclick = function (e) { console.log(topBar); that.removeBoard(topBar); };

        header.appendChild(document.createTextNode("MessageBoard"));
        newBoard.className = "board";
        newBoard.appendChild(header);
        topBar.appendChild(newBoard); 
        main.appendChild(topBar );

        arrMessageBoards.push(new MessageBoard(newBoard, topBar));
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


    // Vi kopplar en eventhanterare till formul�rets skickaknapp som k�r en anonym funktion.
    start.addEventListener("click", function (e) {
        e.preventDefault(); // Hindra formul�ret fr�n att skickas till servern
        labby.createBoard();
        InitDragDrop();
    });
};