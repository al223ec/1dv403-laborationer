function Message(text, date, div) {
    Object.defineProperties(this, {
        text: {
            get: function () { return text; },
            set: function (value) { text = value; }
        },
        date: {
            get: function () { return date; },
            set: function (value) { date = value; }
        },
        div: {
            get: function () { return div; },
        }
    });
}