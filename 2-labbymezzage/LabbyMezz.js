"use strict";
function LabbyMezz () {
    var arrMessageBoards;
    var main; 

    this.init = function () {
        arrMessageBoards =[];
        main = document.querySelector("body");
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

        closeButton.onclick = function (e) {
            if(!confirm("Vill du stänga detta fönster")){
                return;
            }
            removeBoard(topBar);
        };

        header.appendChild(document.createTextNode("MessageBoard"));
        newBoard.className = "board";
        newBoard.appendChild(header);
        topBar.appendChild(newBoard); 
        main.appendChild(topBar);

        arrMessageBoards.push(new MessageBoard(newBoard));
        arrMessageBoards[arrMessageBoards.length -1].init();

        topBar.style.left = 100 + (arrMessageBoards.length * 10) + 'px';
        topBar.style.top = 100 + (arrMessageBoards.length * 10) + 'px';
    };

    function removeBoard(boardToRemove){
        var boardIndex;
        main.removeChild(boardToRemove);
        arrMessageBoards.map(function (board, index) {
            if (board.newBoard === boardToRemove) {
                boardIndex = index;
            }
        });
        arrMessageBoards.splice(boardIndex, 1);
    };
};

window.onload = function () {
    var start = document.querySelector("#start");
    var labby = new LabbyMezz();
    labby.init();
    var drag = new Drag();

    // Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
    start.addEventListener("click", function (e) {
        e.preventDefault(); // Hindra formuläret från att skickas till servern
        labby.createBoard();
        drag.InitDragDrop();
    });
};