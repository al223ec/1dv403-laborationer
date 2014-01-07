"use strict";
function RssReader() {
    App.call(this);
    var container = this.container;
    var result = null;

    this.start = function () {
        this.init("RssReader");
        loadFile();
    };

    function loadFile() {
        var startTime = new Date();
        var timeout = setTimeout(displayFooter, 200);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            try {
                if (xhr.readyState == 4) { //redy state 4 == Complete  3 == recieveing This kan inte användas i detta fall pga Browser kompatibilitet
                    clearTimeout(timeout);
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {//lyckat
                        result = JSON.parse(xhr.responseText);
                        displayFeed();
                        PWD.fixBounds();
                        while (footer.firstChild) {
                            footer.removeChild(footer.firstChild);
                        }
                        footer.appendChild(document.createTextNode("Detta tog: " + (new Date().getTime() - startTime.getTime()) + "ms"));
                    } else {//misslyckades
                        throw Error(xhr.status);
                    }
                }
            } catch (ex) {
                console.log(ex);
            }
        };

        xhr.open("get", 'http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/', true);
        xhr.send(null);
    };
    function displayFooter() {
        var img = document.createElement("img");
        img.src = 'img/loader.gif';
        footer.appendChild(img);
        footer.appendChild(document.createTextNode("Laddar..."));
    };
    function displayFeed() {
    };
};

RssReader.prototype = Object.create(App.prototype);
RssReader.prototype.toString = function () {
    return "RssReader";
};