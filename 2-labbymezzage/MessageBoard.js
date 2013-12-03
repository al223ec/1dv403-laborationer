"use strict";
function MessageBoard(container, topBar) { //conatiner den div som håller hela messageBoarden
    var messages = [];
    this.topBar = topBar; 
    this.textarea = document.createElement("textarea"),
    this.messageContainerDiv = document.createElement("div"),
    this.numberDiv = document.createElement("div");
    this.inputButton = document.createElement("input");

    this.init = function (e){
        var messageForm = document.createElement("form"); 
        this.messageContainerDiv.className = "messageContainer";
        this.numberDiv.className = "textRight";

        this.inputButton.type = "button";
        this.inputButton.value = "skriv";
        this.inputButton.className = "submit right";

        var that = this;
        this.initInput();

        this.textarea.addEventListener("keypress", function (e) {
            if (!e) { var e = window.event; }

            if (e.keyCode === 13 && !e.shiftKey) { //keycode 13 = enter
                e.preventDefault(); //behövs ingen radbrytning
                that.addMessage(that.textarea.value);
            }
        }, false
        );
        this.upDateNumber();

        messageForm.appendChild(this.textarea);
        messageForm.appendChild(this.inputButton);
        container.appendChild(this.numberDiv);
        container.appendChild(this.messageContainerDiv);
        container.appendChild(messageForm);
    };

    Object.defineProperties(this, {
        Messages: {
            get: function () { return messages; },
            set: function (vaue) { messages = value; },
        }
    });

    //  var that = this;
    //this.shiftEnterDefaultListener = function (e, messIndex) {
    //    if (!e) { var e = window.event; }

    //    if (e.keyCode === 13 && !e.shiftKey) { //keycode 13 = enter
    //        e.preventDefault(); //behövs ingen radbrytning
    //        that.addMessage(this.value, messIndex);
    //    }
    //};

    //this.shiftEnterEditListener = function (e) {
    //    if (!e) { var e = window.event; }

    //    if (e.keyCode === 13 && !e.shiftKey) { //keycode 13 = enter
    //        e.preventDefault(); //behövs ingen radbrytning
    //        that.upDateMessages(that);
    //    }
    //};
}

MessageBoard.prototype.addMessage = function (text) {
    text = text.trim();
    if ((!text) || (0 === text.length)) {
        return;
    }
    this.messages.push(new Message(text, new Date(), document.createElement("div")));
    this.addMessToSite(this.messages[this.messages.length - 1]);
    this.messageNum += 1;
};

MessageBoard.prototype.addMessToSite = function (mess) {
    this.messageContainerDiv.appendChild(mess.addDiv(this));
    this.textarea.value = ""; 
    this.upDateNumber();
};
MessageBoard.prototype.removeMessage = function (messToRemove) {
    if (!confirm("Är du säker att du vill ta bort detta meddelande?")) {
        return;
    }
    var messIndex;
    this.messageContainerDiv.removeChild(messToRemove.Div);
    this.messages.map(function (mess, index){ 
        if (mess.Div === messToRemove.Div) {
            messIndex = index; 
        }
    });
    this.messages.splice(messIndex, 1);
    this.messageNum -= 1;
    this.upDateNumber();
};
MessageBoard.prototype.upDateNumber = function () {
    if (this.numberDiv.hasChildNodes()) {
        this.numberDiv.removeChild(this.numberDiv.lastChild);
    }
    this.numberDiv.appendChild(document.createTextNode("Antal mess: " + this.messages.length));
};
MessageBoard.prototype.editMessage = function (messToEdit) {
    this.textarea.value = messToEdit.Text;
    var messIndex; 

    this.messages.map(function (mess, index) {
        if (mess === messToEdit) {
            messIndex = index;
        }
    });
    var that = this; 
    this.inputButton.onclick = function (e) {
        that.upDateMessages(that, messIndex);
        that.initInput();
    };
};

MessageBoard.prototype.upDateMessages = function(that, messIndex){
    if (confirm("Detta skriver över meddelandet")) {
        var newMess = new Message(that.textarea.value, new Date(), document.createElement("div"))
        that.messageContainerDiv.replaceChild(newMess.addDiv(that), that.messages[messIndex].Div);
        that.messages[messIndex] = newMess;
        that.textarea.value = "";
    } else {
        that.initInput();
    }
}
MessageBoard.prototype.initInput = function (e) {
    var that = this;
    this.inputButton.onclick = function (e) {
        that.addMessage(that.textarea.value);
    };
};

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