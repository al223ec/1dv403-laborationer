function MessageBoard(container){
    var messages = []; 

    this.textarea = document.createElement("textarea"),
    this.messageDiv = document.createElement("div"),

    this.init = function (e)
    {
        var messageForm = document.createElement("form"); 
        var inputButton = document.createElement("input"); 
        
        this.messageDiv.className = "row messages";
       
        inputButton.type = "button";
        inputButton.value = "skriv";
        
        var that = this; 
        inputButton.onclick = function (e) { that.addMessage(that.textarea.value)};

        messageForm.appendChild(this.textarea);
        messageForm.appendChild(inputButton);
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
    var text = document.createTextNode(mess.text + mess.date);
    p.appendChild(text);

    mess.div.setAttribute("class", "large-12 columns mess"); //newMess.className  = "large-12 columns";
    mess.div.appendChild(p);

    var del = document.createElement("a");
    del.appendChild(document.createTextNode("Ta bort "));

    var that = this;
    del.onclick = function (e) { that.removeMessage(mess) };
    //var details = document.createElement("a");
    //details.appendChild(document.createTextNode(" Detaljer"));
    mess.div.appendChild(del);

    this.messageDiv.appendChild(mess.div);
};
MessageBoard.prototype.removeMessage = function (messToRemove) {
    var messIndex;
    this.messageDiv.removeChild(messToRemove.div);
    this.messages.map(function (mess, index){ 
        if (mess.div === messToRemove.div) {
            messIndex = index; 
        }
    });
    this.messages.splice(messIndex, 1);
    this.messageNum -= 1;
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

    // Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
    start.addEventListener("click", function(e){
        e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

        arrMessageBoards.push(new MessageBoard(main));
        arrMessageBoards[numOfBoards].init();
        numOfBoards++;
        console.log(numOfBoards);
        //for (var i = 0; i < arrMessageBoards.length; i++) {
        //    console.log(arrMessageBoards[i].getMessages().length);
        //}
    });
};