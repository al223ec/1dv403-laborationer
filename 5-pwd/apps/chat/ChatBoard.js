"use strict";
PWD.App.ChatBoard = function() {
    PWD.App.call(this);
    var container = this.container;
    var messages = [];
    var textarea = document.createElement("textarea");
    var messageContainerDiv = document.createElement("div");
    var numberDiv = document.createElement("div");
    var inputButton = document.createElement("input");

    var that = this; //Denna messageboarden 

    //Läs inställningar
    var author = PWD.Settings.ChatBoard.author;
    var messagesToDisplay = PWD.Settings.ChatBoard.messagesToDisplay;
    var updateIntervallTime = PWD.Settings.ChatBoard.updateIntervallTime;

    var updateIntervall;

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
        read();
        return this.getDragDiv();
    };
    function read(number) {
        if (+number || number == 0) {
            messagesToDisplay = number;
        }

        var path = "http://homepage.lnu.se/staff/tstjo/labbyserver/getMessage.php?history=" + messagesToDisplay;
        that.readFromServer(path, readMessages, that.footer, "get");
        
        clearInterval(updateIntervall);
        updateIntervall = setInterval(read, updateIntervallTime);

        //Spara inställningar
        PWD.Settings.ChatBoard.updateIntervallTime = updateIntervallTime;
        PWD.Settings.ChatBoard.messagesToDisplay = messagesToDisplay;
        PWD.Settings.ChatBoard.author = author;
        PWD.Settings.Save();
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

            messages.push(new PWD.App.ChatBoard.ChatMessage(text, date, document.createElement("div"), id, author));
            addMessToSite(messages[messages.length - 1]);
        }
    }; 

    function viewMenu(e) {
        e.preventDefault();
        var list = [];
        list.push(document.createElement("a").appendChild(document.createTextNode("click")));
        that.DisplayRightClickMeny.init(list, e);
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
        var mess = new PWD.App.ChatBoard.ChatMessage(text, new Date(), document.createElement("div"), messages[messages.length - 1].Id + 1, author);
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
        var links = [{
                text: "Uppdateringsintervall",
                func: function () {
                    return function () {
                        var div = document.createElement("div");
                        updateInterval(div);
                        div.style.left = this.offsetLeft + 80 + 'px';
                        div.style.top = this.offsetTop -20 + 'px';
                        div.className = 'visible menuStep';
                        this.appendChild(div);
                    };
                },
            },{
                text: "Ändra användare",
                func: function () {
                    return function () {
                        that.getInput("Ange användarnamn", updateUsername)
                    };
                },
            },{
                text: "Antal  meddelande",
                func: function () {
                    return function () {
                        that.getInput("Ange antal medelanden", read);
                    }
                },
            }];

        for (var i = 0; i < links.length; i++) {
            var a = document.createElement("a");
            a.onclick = links[i].func(div);
            a.appendChild(document.createTextNode(links[i].text));
            div.appendChild(a);
        }
    };
    function updateInterval(div) {
        var links = [
            { name:"10", text: "10 sekunder", value: 10000, },
            { name: "30", text: "30 sekunder", value: 30000, },
            { name: "1", text: "1 minut", value: 60000, }
        ];
        var form = document.createElement("form");
        form.appendChild(document.createTextNode("Uppdateringsintervall"));

        for (var i = 0; i < links.length; i++) {
            var p = document.createElement("p");
            var input = document.createElement("input");
            input.type = "radio";
            input.value = links[i].value;
            input.name = "name";
            input.disabled = false;

            input.onclick = function () {
                updateIntervallTime = this.value;
                var alHidden = document.querySelectorAll(".visible");
                for (var i = 0; i < alHidden.length; i++) {
                    alHidden[i].className = "hidden";
                }
                read();
            };
            var label = document.createElement("label");
            label.appendChild(document.createTextNode(links[i].text));
            p.appendChild(input);
            p.appendChild(label);
            form.appendChild(p);
        }
        div.appendChild(form);
    };
}

PWD.App.ChatBoard.prototype = Object.create(PWD.App.prototype);
PWD.App.ChatBoard.prototype.toString = function () {
    return 'ChatBoard';
};
PWD.App.ChatBoard.prototype.readFromServer = PWD.App.RssReader.prototype.readFromServer;
