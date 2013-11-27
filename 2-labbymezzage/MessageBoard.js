"use strict";

function MessageBoard(container) {
    var messages = []; 

    this.textarea = document.createElement("textarea"),
    this.messageDiv = document.createElement("div"),
    this.numberDiv = document.createElement("div");

    this.init = function (e){
        var messageForm = document.createElement("form"); 
        var inputButton = document.createElement("input");

        
        this.messageDiv.className = "row messageContainer";
        this.numberDiv.className = "row 12-large columns textRight";

        inputButton.type = "button";
        inputButton.value = "skriv";
        inputButton.className = "submit right"; 
        
        var that = this; 
        inputButton.onclick = function (e) { that.addMessage(that.textarea.value) };

        this.textarea.addEventListener("keypress", function (e) {
                if (!e) { var e = window.event; }
                
                if (e.keyCode === 13 && !e.shiftKey) { //keycode 13 = enter
                    e.preventDefault(); //behövs ingen radbrytning
                    that.addMessage(that.textarea.value);
                }
            }, false);
        
        messageForm.appendChild(this.textarea);
        messageForm.appendChild(inputButton);

        this.upDateNumber();
        container.appendChild(this.numberDiv);
        container.appendChild(this.messageDiv);
        container.appendChild(messageForm);
    };

    Object.defineProperties(this, {
        messages: {
            get: function () { return messages; },
            set: function (vaue) { messages = value; },
        }
    });
}

MessageBoard.prototype.addMessage = function (text) {
    text = text.trim();
    if ((!text) || (0 === text.length)) {
        return;
    }
    this.messages.push(new Message(text, new Date(), document.createElement("div")));
    this.addToSite(this.messages[this.messages.length - 1]);
    this.messageNum += 1;
};

MessageBoard.prototype.addToSite = function (mess) {
    var p = document.createElement("p");
    p.appendChild(document.createTextNode(mess.Text));

    mess.Div.setAttribute("class", "large-12 columns mess"); //newMess.className  = "large-12 columns";
    mess.Div.appendChild(p);

    var footer = document.createElement("footer");
    footer.appendChild(document.createTextNode(mess.Date.toDateString()));
    var del = document.createElement("a");
    del.appendChild(document.createTextNode(" Ta bort "));

    var that = this;
    del.onclick = function (e) { that.removeMessage(mess) };
    //var details = document.createElement("a");
    //details.appendChild(document.createTextNode(" Detaljer"));
    footer.appendChild(del);
    mess.Div.appendChild(footer);

    this.messageDiv.appendChild(mess.Div);
    this.upDateNumber();
};
MessageBoard.prototype.removeMessage = function (messToRemove) {
    var messIndex;
    this.messageDiv.removeChild(messToRemove.Div);
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
