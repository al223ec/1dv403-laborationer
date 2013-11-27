function Message(text, date, num) {
    Object.defineProperties(this, {
        text: {
            get: function () { return text; },
            set: function (value) { text = value; }
        },
        date: {
            get: function () { return date; },
            set: function (value) { date = value; }
        },
        num: {
            get: function () { return num; },
            set: function (value) { num = value; }
        }
    });
}