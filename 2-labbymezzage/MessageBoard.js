var MessageBoard = {
    messages : [],
    messageCounter : 0,
    
    init : function(e)
    {
        var main = document.querySelector("main");
        var messagesDiv = document.createElement("div");
        messagesDiv.className = "row messages";
        var form = document.createElement("form");

        var textarea = document.createElement("textarea");
        textarea.className = "msgText";

        var div = document.querySelector("main form");

        var that = this;
        var inputButton = document.createElement("input");
        inputButton.type = "button";
        inputButton.value = "skriv";
        inputButton.onclick = function (e) { that.addMessage(document.querySelector(".msgText").value) };

        form.appendChild(textarea);
        form.appendChild(inputButton);
        main.appendChild(messagesDiv);
        main.appendChild(form);
    },
    
    addMessage : function (text) {
        text = text.trim();
        if ((!text) || (0 === text.length)) {
            return;
        }
        this.messages.push(new Message(text, new Date()));
        this.addToSite(text);
        this.messageCounter++;
    },

    getMessages  : function () {
        return this.messages
    },

    addToSite : function (mess) {
        var div = document.querySelector(".messages"); //Hämta existerande element
        var newMess = document.createElement("div");
        var p = document.createElement("p");
        newMess.setAttribute("class", "large-12 columns mess"); //newMess.className  = "large-12 columns";
        var text = document.createTextNode(mess);

        var del = document.createElement("a");
        del.appendChild(document.createTextNode("Ta bort "));
        var details = document.createElement("a");
        details.appendChild(document.createTextNode(" Detaljer"));

        p.appendChild(text);
        newMess.appendChild(p);
        newMess.appendChild(del);
        newMess.appendChild(details);
        div.appendChild(newMess);
    }
}

window.onload = function () {

    var start = document.querySelector("#start");
    // Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
    start.addEventListener("click", function(e){
        e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.
        MessageBoard.init();
        var messBoard2 = MessageBoard.constructor();
    
    });
};