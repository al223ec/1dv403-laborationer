"use strict"; 
PWD.App.MessageBoard.Message = function(text, messageDate, div) {
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
        var edit = document.createElement("a");

        dateA.appendChild(document.createTextNode(this.MessageDate.toDateString()));
        del.appendChild(document.createTextNode(" Ta bort"));
        edit.appendChild(document.createTextNode(" Redigera "));

        edit.className = "textLeft";
        del.className = "textRight";

        var thisMessage = this; //behövs pga scopet
        del.onclick = function (e) {
            that.removeMessage(thisMessage);
        };
        edit.onclick = function (e) {
            that.editMessage(thisMessage);
        };
        dateA.onclick = function (e) {
            alert("Detta meddelande blev skrivet: " + thisMessage.MessageDate);
        };

        footer.appendChild(edit);
        footer.appendChild(dateA);
        footer.appendChild(del);

        div.appendChild(p);
        div.appendChild(footer);

        return div;
    }
}
PWD.App.MessageBoard.Message.prototype.getHTMLText = function () {
    return this.Text.replace(/[\n\r]/g, "<br />");
}
