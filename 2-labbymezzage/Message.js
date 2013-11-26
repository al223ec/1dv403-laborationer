﻿function Message(text, date) {

    Object.defineProperties(this, {
        text: {
            get: function () { return text; },
            set: function (value) { text = value; }
        },
        date : {
            get: function () { return date; },
            set: function (value) { date = value; }
        }
    });
}