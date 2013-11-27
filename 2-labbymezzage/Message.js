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