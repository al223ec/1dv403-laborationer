function MessageBoard(container){
    messages = [],
    messageCounter = 0,

    //messageDiv = document.createElement("div"),
    //messageForm = form = document.createElement("form"),
    //textarea = document.createElement("textarea"),
    //inputButton = document.createElement("input"),

    this.textarea = document.createElement("textarea"),
    this.messageDiv = document.createElement("div"),

    this.init = function(e)
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
    
    this.addMessage = function (text) {
        text = text.trim();
        if ((!text) || (0 === text.length)) {
            return;
        }
        messages.push(new Message(text, new Date(), messageCounter));
        this.addToSite(messages[messageCounter]);
        messageCounter++;
        console.log(messageCounter);
    };

    getMessages = function () {
        return this.messages
    };

    this.addToSite = function (mess) {
        var newMess = document.createElement("div");
        var p = document.createElement("p");
        newMess.setAttribute("class", "large-12 columns mess"); //newMess.className  = "large-12 columns";
        var text = document.createTextNode(mess.text + mess.num + mess.date);


        p.appendChild(text);
        newMess.appendChild(p);

        //var del = document.createElement("a");
        //del.appendChild(document.createTextNode("Ta bort "));
        //var details = document.createElement("a");
        //details.appendChild(document.createTextNode(" Detaljer"));
        //newMess.appendChild(del);
        //newMess.appendChild(details);

        this.messageDiv.appendChild(newMess);
    };
}

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
        //MessageBoard.init();
        arrMessageBoards.push(new MessageBoard(main));
        arrMessageBoards[numOfBoards].init();
        numOfBoards++;

        //for (var i = 0; i < arrMessageBoards.length; i++) {
        //    console.log(arrMessageBoards[i]);
        //}
    });
};