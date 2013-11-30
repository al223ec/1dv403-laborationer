"use strict";
function MessageBoard(container, topBar) { //conatiner den div som håller hela messageBoarden
    var messages = [];
    var editMessage = false; 
    this.topBar = topBar; 
    this.textarea = document.createElement("textarea"),
    this.messageDiv = document.createElement("div"),
    this.numberDiv = document.createElement("div");

    this.init = function (e){
        var messageForm = document.createElement("form"); 
        var inputButton = document.createElement("input");

        this.messageDiv.className = "messageContainer";
        this.numberDiv.className = "textRight";

        inputButton.type = "button";
        inputButton.value = "skriv";
        inputButton.className = "submit right";

        
        var that = this; 
        inputButton.onclick = function (e) {
            if (!this.editmessage) {
                that.addMessage(that.textarea.value);
            }
            else {
                that.replaceMessage(that.textarea.value); 
            }
        };

        this.textarea.addEventListener("keypress", function (e) {
                if (!e) { var e = window.event; }
                
                if (e.keyCode === 13 && !e.shiftKey) { //keycode 13 = enter
                    e.preventDefault(); //behövs ingen radbrytning
                    that.addMessage(that.textarea.value);
                }
            }, false);
        
        this.upDateNumber();

        messageForm.appendChild(this.textarea);
        messageForm.appendChild(inputButton);
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
    this.addMessToSite(this.messages[this.messages.length - 1]);
    this.messageNum += 1;
};

MessageBoard.prototype.addMessToSite = function (mess) {
    this.messageDiv.appendChild(mess.addDiv(this));
    this.textarea.value = ""; 
    this.upDateNumber();
};
MessageBoard.prototype.removeMessage = function (messToRemove) {
    if (!confirm("Är du säker att du vill ta bort detta meddelande?")) {
        return;
    }
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
MessageBoard.prototype.editMessage = function (messToEdit) {
    console.log(messToEdit.Text); 
    this.textarea.value = messToEdit.Text;//.replaceAll(/<br />/g, "n");;
    var messIndex; 

    this.messages.map(function (mess, index) {
        if (mess === messToEdit) {
            messIndex = index;
        }
    });
    console.log(messIndex); 
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

//    this.messageDiv.appendChild(mess.Div);
//    this.messageDiv.appendChild(mess.intiDiv(this));
//    this.upDateNumber();
//};