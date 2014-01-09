"use strict";
function ChatBoard() {
    App.call(this);
    var container = this.container;
    var messages = [];
    var textarea = document.createElement("textarea");
    var messageContainerDiv = document.createElement("div");
    var numberDiv = document.createElement("div");
    var inputButton = document.createElement("input");
    //history = 0
    var that = this; //Denna messageboarden 
    var author = "Anton";

    var messagesToDisplay = 4; 

    this.start = function () {
        this.init("Chat board");
        container.className = "container messageBoard";

        initDropDown(this.addDropDown("Inställningar", true));

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
        read(4); 
        return this.getDragDiv();
    };
    function read(number) {
        if (+number) {
            messagesToDisplay = number;
        }
        var path = "http://homepage.lnu.se/staff/tstjo/labbyserver/getMessage.php?history=" + messagesToDisplay;
        that.readFromServer(path, readMessages, that.footer, "get");
    };

    function readMessages(xhr) {
        messages = [];
        messageContainerDiv.innerHTML = '';

        var parser = new DOMParser();
        var xmldom = parser.parseFromString(xhr.responseText, "text/xml");
        var allmessages = xmldom.querySelectorAll("message");
        
        for (var i = 0; i < allmessages.length; i++) {
            var text = '';
            var author = ''; 
            var id = 0;
            var date = new Date(); 
            if (allmessages[i].querySelector("text").childNodes[0]) {
                text = allmessages[i].querySelector("text").childNodes[0].nodeValue;
            }
            if (allmessages[i].querySelector("time").childNodes[0]) {
                date = new Date(+allmessages[i].querySelector("time").childNodes[0].nodeValue);
            }
            if (allmessages[i].querySelector("id").childNodes[0]) {
                id = +allmessages[i].querySelector("id").childNodes[0].nodeValue;
            }
            if (allmessages[i].querySelector("author").childNodes[0]) {
                author = allmessages[i].querySelector("author").childNodes[0].nodeValue;
            }

            messages.push(new ChatMessage(text, date, document.createElement("div"), id, author));
            addMessToSite(messages[messages.length - 1]);
        }
    }; 

    function viewMenu(e) {
        e.preventDefault();
        var list = [];
        list.push(document.createElement("a").appendChild(document.createTextNode("click")));
        that.DisplayMeny.init(list, e);
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
        var mess = new ChatMessage(text, new Date(), document.createElement("div"), messages[messages.length - 1].Id+1, author);
        messages.push(mess);
        addMessToSite(messages[messages.length - 1]);
        addMessToServer(mess); 
    };

    function addMessToSite (mess) {
        messageContainerDiv.appendChild(mess.addDiv(that));
        textarea.value = ""; 
        upDateNumber();
    };

    function addMessToServer(message) {
        var postPath = "http://homepage.lnu.se/staff/tstjo/labbyserver/setMessage.php";
        that.readFromServer(postPath, read, that.footer, "post", false, "text=" + message.getText() + "&username=" + message.getAuthor());
    };

    function updateUsername(newName) {
        author = newName;
        console.log(author);
    }; 
    function initDropDown(div) {
        var updateIntervalDiv = document.createElement("div");
        updateIntervalDiv.className = 'hidden menuStep';

        updateInterval(updateIntervalDiv);

        var changeIntervall = document.createElement("a")
            changeIntervall.href = "#";

            changeIntervall.appendChild(document.createTextNode("Uppdateringsintervall"));
            div.appendChild(changeIntervall);
            changeIntervall.appendChild(updateIntervalDiv);

            changeIntervall.onclick = function () {
                updateIntervalDiv.className = 'visible menuStep';
            };

        updateIntervalDiv.style.left = changeIntervall.offsetLeft + 80 + 'px';
        updateIntervalDiv.style.top = changeIntervall.offsetTop + 'px';

        var changeUser = document.createElement("a")
            changeUser.href = "#";
            changeUser.appendChild(document.createTextNode("Ändra användare"));

            changeUser.onclick = function () {
                that.getInput("Ange användarnamn", updateUsername);
            };
        div.appendChild(changeUser);

        var changeMessages = document.createElement("a")
            changeMessages.href = "#";
            changeMessages.appendChild(document.createTextNode("Antal meddelande"));

            changeMessages.onclick = function () {
                that.getInput("Ange antal medelanden", read);
            };
        div.appendChild(changeMessages);

    };
    function updateInterval(div) {
        var time3 = document.createElement("a")
            time3.href = "#";
            time3.onclick = function () {

            };
            time3.appendChild(document.createTextNode("3 minuter"));
        div.appendChild(time3);
    };
}
ChatBoard.prototype = Object.create(App.prototype);
ChatBoard.prototype.toString = function () {
    return 'ChatBoard';
};
ChatBoard.prototype.readFromServer = RssReader.prototype.readFromServer;
