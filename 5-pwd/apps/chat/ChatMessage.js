"use strict"; 
PWD.App.ChatBoard.ChatMessage = function(text, messageDate, div, id, author) {
    this.Text = text;
    this.MessageDate = messageDate;

    Object.defineProperties(this, {
        Text: {
            get: function () { return text; },
            set: function (value) { text; }
        },
        MessageDate: {
            get: function () { return messageDate; },
            set: function (value) {
                if(!(value instanceof Date)) {
                    throw Error("Ej ett date objekt!!");
                }
                messageDate = value;
            }
        },
        Div: {//privacy leak
            get: function () { return div; }
        },
        Id: {
            set: function (value) {
                id = value;
            },
            get: function () { return id; }
        },
        Author: {
            set: function (value) {
                author = value;
            },
            get: function () { return author; }
        }
    });

    this.addDiv = function (that) { // kan kanske lägga denna på prototypen också
        //That är den aktuella messageboarden
        var p = document.createElement("p");
        //p.appendChild(document.createTextNode(this.getHTMLText()));
        p.innerHTML = this.getHTMLText();

        div.setAttribute("class", "mess");

        var footer = document.createElement("footer");
        var dateA = document.createElement("a");
        var del = document.createElement("a");

        dateA.appendChild(document.createTextNode(this.MessageDate.toDateString()));
        del.appendChild(document.createTextNode(author));
        del.className = "textRight";

        var thisMessage = this; //behövs pga scopet
        dateA.onclick = function (e) {
            alert("Detta meddelande blev skrivet: " + thisMessage.MessageDate);
        };

        footer.appendChild(dateA);
        footer.appendChild(del);

        div.appendChild(p);
        div.appendChild(footer);

        return div;
    };
    this.getText = function () {
        return text; 
    };
    this.getAuthor = function () {
        return author;
    };
}
PWD.App.ChatBoard.ChatMessage.prototype.getHTMLText = function () {
    return this.Text.replace(/[\n\r]/g, "<br />");
}
PWD.App.ChatBoard.ChatMessage.prototype.getXML = function () {
    var message = document.createElement("message");

    var id = document.createElement("id");
    id.appendChild(document.createTextNode(this.Id));
    message.appendChild(id);

    var text = document.createElement("text");
    text.appendChild(document.createTextNode(this.Text));
    message.appendChild(text);

    var author = document.createElement("author");
    author.appendChild(document.createTextNode(this.Author));
    message.appendChild(author);

    var time = document.createElement("time");
    time.appendChild(document.createTextNode(this.MessageDate.getDate()));
    message.appendChild(time);

    return message; 
};