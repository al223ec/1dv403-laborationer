"use strict";
var LabbyMezz = function () {

    init : {

    }

}; 
window.onload = function () {

    var start = document.querySelector("#start");
    //var clone = document.getElementById("messageBoard");
    //console.log(clone); 
    //var theClone = clone.cloneNode(true);
    //var main = document.querySelector("main");
    //main.appendChild(theClone);
    var arrMessageBoards = [];
    var numOfBoards = 0;
    var main = document.querySelector("main");

    function removeBoard(boardToRemove) {
        var boardIndex;
        this.main.removeChild(boardToRemove);
        this.arrMessageBoards.map(function (board, index) {
            if (board.div === boardToRemove) {
                boardIndex = index;
            }
        });
        this.arrMessageBoards.splice(boardIndex, 1);
    };

    // Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
    start.addEventListener("click", function (e) {
        e.preventDefault(); // Hindra formuläret från att skickas till servern

        var newBoard = document.createElement("div");
        var topBar = document.createElement("div");
        var header = document.createElement("h1");
        var closeButton = document.createElement("input");

        closeButton.type = "button";
        closeButton.value = "X";
        closeButton.className = "close";

        topBar.className = "large-12 columns topBar";
        topBar.appendChild(closeButton);

        header.appendChild(document.createTextNode("MessageBoard"));
        newBoard.className = "board";
        newBoard.appendChild(topBar);
        newBoard.appendChild(header);
        main.appendChild(newBoard);

        arrMessageBoards.push(new MessageBoard(newBoard));
        arrMessageBoards[numOfBoards].init();
        numOfBoards++;
        console.log(numOfBoards);
        //for (var i = 0; i < arrMessageBoards.length; i++) {
        //    console.log(arrMessageBoards[i].getMessages().length);
        //}
    });
};