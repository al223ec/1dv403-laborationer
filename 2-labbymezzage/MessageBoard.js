var MessageBoard = {
    messages : [],
    messageCounter: 0,
    
    init : function(e)
    {},

    addMessage: function (text) {
        this.messages.push(new Message(text, new Date()));
        this.messageCounter++;
    },

    getMessages : function () {
        return this.messages
    },

    addToSite: function (mess) {

    }
};


window.onload = function () {
    MessageBoard.init();

    // Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
    var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
    var input = document.querySelector("#msgText");
    var submit = document.querySelector("#sendMsg");

    // Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
    submit.addEventListener("click", function(e){
        e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

        p.classList.remove( "error");

        try {
            MessageBoard.addMessage(input.value); // Läser in texten från textrutan och skickar till funktionen "convertString"
            //p.innerHTML;		// Skriver ut texten från arrayen som skapats i funktionen.	
        } catch (error){
            p.classList.add( "error"); // Växla CSS-klass, IE10+
            p.innerHTML = error.message;
        }
        var allMessages = MessageBoard.getMessages();
        console.log(allMessages);
        allMessages.map(function (mess) { p.innerHTML += mess.text; });
    });
};