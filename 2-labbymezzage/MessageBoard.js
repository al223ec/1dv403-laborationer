"use strict";
function MessageBoard(container, topBar) { //conatiner den div som håller hela messageBoarden, top bar div ligger utanför denna och gör att man kan röra 
    var messages = [];
    var topBar = topBar; 
    var textarea = document.createElement("textarea");
    var messageContainerDiv = document.createElement("div");
    var numberDiv = document.createElement("div");
    var inputButton = document.createElement("input");

    var that = this; //Denna messageboarden 
    var editMessageIndex;

    this.init = function (e){
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
    };

    function initInput(e) {
        inputButton.onclick = function (e) {
            addMessage(textarea.value);
        };

        textarea.addEventListener("keypress", shiftEnter, false);
    };

    function shiftEnter(e) {
        if (!e) { var e = window.event; }

        if (e.keyCode === 13 && !e.shiftKey) { //keycode 13 = enter
            e.preventDefault(); //behövs ingen radbrytning
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

    Object.defineProperties(this, {
        Messages: {
            get: function () { return messages; },
            set: function (vaue) { messages = value; },
        }
    });

    function addMessage(text) {
        text = text.trim();
        if ((!text) || (0 === text.length)) {
            return;
        }
        messages.push(new Message(text, new Date(), document.createElement("div")));
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
                upDateMessages(that, editMessageIndex);
                initInput();
            };
            textarea.removeEventListener("keypress", shiftEnter, false);
            textarea.addEventListener("keypress", shiftEnterEdit, false);
    };

    function upDateMessages(messIndex) {
        if (confirm("Detta skriver över meddelandet")) {
            var newMess = new Message(textarea.value, new Date(), document.createElement("div"));
            messageContainerDiv.replaceChild(newMess.addDiv(that), messages[messIndex].Div);
            messages[messIndex] = newMess;
            textarea.value = "";
        }
        textarea.removeEventListener("keypress", shiftEnterEdit, false);
        initInput();
        textarea.value = "";
    };
}

//Samma funktionalitet men på prototypen, kräver publika variablar
//MessageBoard.prototype.addMessage = function (text) {
//    text = text.trim();
//    if ((!text) || (0 === text.length)) {
//        return;
//    }
//    this.messages.push(new Message(text, new Date(), document.createElement("div")));
//    this.addMessToSite(this.messages[this.messages.length - 1]);
//    this.messageNum += 1;
//};

//MessageBoard.prototype.addMessToSite = function (mess) {
//    this.messageContainerDiv.appendChild(mess.addDiv(this));
//    this.textarea.value = ""; 
//    this.upDateNumber();
//};
//MessageBoard.prototype.removeMessage = function (messToRemove) {
//    if (!confirm("Är du säker att du vill ta bort detta meddelande?")) {
//        return;
//    }
//    var messIndex;
//    this.messageContainerDiv.removeChild(messToRemove.Div);
//    this.messages.map(function (mess, index){ 
//        if (mess.Div === messToRemove.Div) {
//            messIndex = index; 
//        }
//    });
//    this.messages.splice(messIndex, 1);
//    this.messageNum -= 1;
//    this.upDateNumber();
//};
//MessageBoard.prototype.upDateNumber = function () {
//    if (this.numberDiv.hasChildNodes()) {
//        this.numberDiv.removeChild(this.numberDiv.lastChild);
//    }
//    this.numberDiv.appendChild(document.createTextNode("Antal mess: " + this.messages.length));
//};
//MessageBoard.prototype.editMessage = function (messToEdit) {
//    this.textarea.value = messToEdit.Text;
//    var messIndex; 

//    this.messages.map(function (mess, index) {
//        if (mess === messToEdit) {
//            messIndex = index;
//        }
//    });
//    var that = this; 
//    this.inputButton.onclick = function (e) {
//        that.upDateMessages(that, messIndex);
//        that.initInput();
//    };
//};

//MessageBoard.prototype.upDateMessages = function(that, messIndex){
//    if (confirm("Detta skriver över meddelandet")) {
//        var newMess = new Message(that.textarea.value, new Date(), document.createElement("div"))
//        that.messageContainerDiv.replaceChild(newMess.addDiv(that), that.messages[messIndex].Div);
//        that.messages[messIndex] = newMess;
//        that.textarea.value = "";
//    } else {
//        that.initInput();
//    }
//}
//MessageBoard.prototype.initInput = function (e) {
//    var that = this;
//    this.inputButton.onclick = function (e) {
//        that.addMessage(that.textarea.value);
//    };
//};

//MessageBoard.prototype.addMessToSite = function (mess) {
//    var p = document.createElement("p");
//    p.innerHTML = mess.Text; 

//    mess.Div.setAttribute("class", "large-12 columns mess"); 
//    mess.Div.appendChild(p);

//    var footer = document.createElement("footer");
//    var date = document.createElement("a");
//    var del = document.createElement("a");
//    var edit = document.createElement("a"); 

//    date.appendChild(document.createTextNode(mess.Date.toDateString()));
//    del.appendChild(document.createTextNode(" Ta bort "));
//    edit.appendChild(document.createTextNode("Redigera "));

//    footer.className = "large-12";
//    edit.className = "textLeft large-6";
//    del.className = "textRight large-2";
//    date.className = "large-4";

//    var that = this;
//    del.onclick = function (e) { that.removeMessage(mess) };
//    edit.onclick = function (e) { that.editMessage(mess) };
//    date.onclick = function (e) { alert("Detta meddelande blev skrivet: " + mess.Date); };

//    footer.appendChild(edit);
//    footer.appendChild(date);
//    footer.appendChild(del);
//    mess.Div.appendChild(footer);

//    this.messageContainerDiv.appendChild(mess.Div);
//    this.messageContainerDiv.appendChild(mess.intiDiv(this));
//    this.upDateNumber();
    //};