"use strict";
PWD.App.MessageBoard = function() {
    PWD.App.call(this);
    var container = this.container;
    var messages = [];
    var textarea = document.createElement("textarea");
    var messageContainerDiv = document.createElement("div");
    var numberDiv = document.createElement("div");
    var inputButton = document.createElement("input");
    var that = this; //Denna messageboarden 
    var editMessageIndex;

    this.start = function () {
        this.init("Message board");
        container.className = "container messageBoard";

        this.addDropDown("Meny", true);

        var messageForm = document.createElement("form"); 
        messageContainerDiv.className = "messageContainer";
        numberDiv.className = "textRight";

        inputButton.type = "button";
        inputButton.value = "skriv";
        inputButton.className = "submit right";

        initInput();
        upDateNumber();

        messageForm.appendChild(textarea);
        messageForm.appendChild(inputButton);
        container.appendChild(numberDiv);
        container.appendChild(messageContainerDiv);
        container.appendChild(messageForm);

        container.oncontextmenu = viewMenu;
        this.getDragDiv().oncontextmenu = viewMenu;

        this.footer.appendChild(document.createTextNode('Message board'));
        return this.getDragDiv();
    };

    function viewMenu(e) {
        e.preventDefault();
        var list = [];
        list.push(document.createElement("a").appendChild(document.createTextNode("click")));
        console.log('högerclick');
        that.DisplayMeny.init(list,e);
    };

    function initInput(e) {
        inputButton.onclick = function (e) {
            addMessage(textarea.value);
        };
        
        textarea.removeEventListener("keypress", shiftEnterEdit, false); //Detta ska inte skapa något problem; att ta bort en Eventlyssnare som inte finns
        textarea.addEventListener("keypress", shiftEnter, false);
        
    };

    function shiftEnter(e) {
        if (!e) { var e = window.event; }

        if (e.keyCode === 13 && !e.shiftKey) { //keycode 13 = enter
            e.preventDefault();
            addMessage(textarea.value);
        }
    };
    function shiftEnterEdit(e) {
        if (!e) { var e = window.event; }

        if (e.keyCode === 13 && !e.shiftKey) { //keycode 13 = enter
            e.preventDefault(); //behövs ingen radbrytning
            upDateMessages(editMessageIndex);
        }
    };

    function upDateNumber() {
        if (numberDiv.hasChildNodes()) {
            numberDiv.removeChild(numberDiv.lastChild);
        }
        numberDiv.appendChild(document.createTextNode("Antal mess: " + messages.length));
    };

    function addMessage(text) {
        text = text.trim();
        if ((!text) || (0 === text.length)) {
            return;
        }
        messages.push(new PWD.App.MessageBoard.Message(text, new Date(), document.createElement("div")));
        addMessToSite(messages[messages.length - 1]);
    };

    function addMessToSite (mess) {
        messageContainerDiv.appendChild(mess.addDiv(that));
        textarea.value = ""; 
        upDateNumber();
    };

    this.removeMessage  = function (messToRemove) {
            if (!confirm("Är du säker att du vill ta bort detta meddelande?")) {
                return;
            }
            var messIndex;
            messageContainerDiv.removeChild(messToRemove.Div);
            messages.map(function (mess, index){ 
                if (mess.Div === messToRemove.Div) {
                    messIndex = index; 
                }
            });
            messages.splice(messIndex, 1);
            initInput();
            upDateNumber();
    };

    this.editMessage = function (messToEdit) {
            textarea.value = messToEdit.Text;

            messages.map(function (mess, index) {
                if (mess === messToEdit){
                    editMessageIndex = index;
                }
            });

            inputButton.onclick = function (e) {
                upDateMessages(editMessageIndex);
                initInput();
            };
            textarea.removeEventListener("keypress", shiftEnter, false);
            textarea.addEventListener("keypress", shiftEnterEdit, false);
    };

    function upDateMessages(messIndex) {
        if (confirm("Detta skriver över meddelandet")) {
            var newMess = new PWD.App.MessageBoard.Message(textarea.value, new Date(), document.createElement("div"));
            messageContainerDiv.replaceChild(newMess.addDiv(that), messages[messIndex].Div);
            messages[messIndex] = newMess;
            textarea.value = "";
        }

        textarea.removeEventListener("keypress", shiftEnterEdit, false);
        initInput();
        textarea.value = "";
    };
}
PWD.App.MessageBoard.prototype = Object.create(PWD.App.prototype);
PWD.App.MessageBoard.prototype.toString = function () {
    return 'MessageBoard';
};
