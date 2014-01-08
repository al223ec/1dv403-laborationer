"use strict";
function ChatBoard() {
    App.call(this);
    var container = this.container;
    var messages = [];
    var textarea = document.createElement("textarea");
    var messageContainerDiv = document.createElement("div");
    var numberDiv = document.createElement("div");
    var inputButton = document.createElement("input");
    var path = "http://homepage.lnu.se/staff/tstjo/labbyserver/getMessage.php?"; //history = 0
    var that = this; //Denna messageboarden 

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

        that.readFromServer(path, readMessages, this.footer);
        return this.getDragDiv();
    };

    function readMessages(xhr) {
        var parser = new DOMParser();
        var xmldom = parser.parseFromString(xhr.responseText, "text/xml");
        console.log(xmldom);
        var allmessages = xmldom.querySelectorAll("message");
        console.log(allmessages);
        //new ChatMessage(text, new Date(), document.createElement("div")); 
        
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

    //function addMessage(text) {
    //    text = text.trim();
    //    if ((!text) || (0 === text.length)) {
    //        return;
    //    }
    //    messages.push(new ChatMessage(text, new Date(), document.createElement("div")));
    //    addMessToSite(messages[messages.length - 1]);
    //};
    function addMessage(text) {
        text = text.trim();
        if ((!text) || (0 === text.length)) {
            return;
        }
        messages.push(new ChatMessage(text, new Date(), document.createElement("div")));
        addMessToSite(messages[messages.length - 1]);
    };

    function addMessToSite (mess) {
        messageContainerDiv.appendChild(mess.addDiv(that));
        textarea.value = ""; 
        upDateNumber();
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

        updateIntervalDiv.style.left = changeIntervall.offsetLeft + 80 + 'px';
        updateIntervalDiv.style.top = changeIntervall.offsetTop + 'px';

        var changeUser = document.createElement("a")
        changeUser.href = "#";
        changeUser.appendChild(document.createTextNode("Ändra användare"));

        changeUser.onclick = function () {
            that.getInput();
        };
        div.appendChild(changeUser);
        changeIntervall.onclick = function () {
            updateIntervalDiv.className = 'visible menuStep';
        };
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
