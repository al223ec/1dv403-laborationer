function Message(text, date, div) {
    var _text;
    var _date;
    var _div = div;

    Object.defineProperties(this, {
        Text: {
            get: function () { return _text; },
            set: function (text) { _text = text.replace(/[\n\r]/g, "<br />"); }
        },
        Date: {
            get: function () { return _date; },
            set: function (value) { _date = value; }
        },
        Div: {
            get: function () { return _div; },
        }
    });


    this.Text = text;
    this.Date = date;
}
Message.prototype.intiDiv = function (that) {

    var p = document.createElement("p");
    p.innerHTML = this.Text;

    this.Div.setAttribute("class", "large-12 columns mess");
    this.Div.appendChild(p);

    var footer = document.createElement("footer");
    var date = document.createElement("a");
    var del = document.createElement("a");
    var edit = document.createElement("a");

    date.appendChild(document.createTextNode(this.Date.toDateString()));
    del.appendChild(document.createTextNode(" Ta bort "));
    edit.appendChild(document.createTextNode("Redigera "));

    footer.className = "large-12";
    edit.className = "textLeft large-6";
    del.className = "textRight large-2";
    date.className = "large-4";

    var thisMessage = this; 
    del.onclick = function (e) { that.removeMessage(thisMessage) };
    edit.onclick = function (e) { that.editMessage(thisMessage) };
    date.onclick = function (e) { alert("Detta meddelande blev skrivet: " + This.Date); };

    footer.appendChild(edit);
    footer.appendChild(date);
    footer.appendChild(del);
    this.Div.appendChild(footer);

    return this.Div; 
}