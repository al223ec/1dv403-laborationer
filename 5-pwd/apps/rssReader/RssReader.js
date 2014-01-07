"use strict";
function RssReader() {
    App.call(this);
    var container = this.container;
    var footer = this.footer; 
    var result = null;
    var updateIntervall = 1000 * 60 * 4; //Var fjärde minut
    var currentPath = ''; 

    this.start = function () {
        this.init("RssReader");
        container.className = "container";
        this.addDropDown("Meny", true);
        initDropDown(this.addDropDown("Inställningar", false));
        currentPath = "http://www.dn.se/m/rss/senaste-nytt";
        loadFile();
        setInterval(loadFile, updateIntervall); //Sätter intervall
        return this.getDragDiv();
    };

    function loadFile() {
        console.log("updaterar");
        var startTime = new Date();
        var timeout = setTimeout(displayFooter, 200);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            try {
                if (xhr.readyState == 4) { //redy state 4 == Complete  3 == recieveing This kan inte användas i detta fall pga Browser kompatibilitet
                    clearTimeout(timeout);
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {//lyckat
                        result = xhr.responseText;
                        container.innerHTML = result;
                        PWD.fixBounds();
                        while (footer.firstChild) {
                            footer.removeChild(footer.firstChild);
                        }
                        footer.appendChild(document.createTextNode("Detta tog: " + (new Date().getTime() - startTime.getTime()) + "ms " + "RSS feeden uppdaterades: " + new Date().toString()));
                    } else {//misslyckades
                        throw Error(xhr.status);
                    }
                }
            } catch (ex) {
                console.log(ex);
            }
        };

        xhr.open("get", "http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url=" + escape(currentPath), true);
        xhr.send(null);
    };
    function displayFooter() {
        var img = document.createElement("img");
        img.src = 'img/loader.gif';
        footer.appendChild(img);
        footer.appendChild(document.createTextNode("Laddar..."));
    };

    function initDropDown(div) {
        var feddDiv = document.createElement("div");
        feddDiv.className = 'hidden menuStep';

        feedAlternativs(feddDiv);

        var changeFeed = document.createElement("a")
        changeFeed.href = "#";

        changeFeed.appendChild(document.createTextNode("Ändra feed"));
        div.appendChild(changeFeed);
        changeFeed.appendChild(feddDiv);

        feddDiv.style.left = changeFeed.offsetLeft + 80 + 'px';
        feddDiv.style.top = changeFeed.offsetTop + 'px';


        var frekvensDiv = document.createElement("div");
        frekvensDiv.className = 'hidden menuStep';

        updateFrekvens(frekvensDiv);

        var changeFrek = document.createElement("a")
        changeFrek.href = "#";

        changeFrek.appendChild(document.createTextNode("Uppdateringsintervall"));
        div.appendChild(changeFrek);
        changeFrek.appendChild(frekvensDiv);

        frekvensDiv.style.left = changeFrek.offsetLeft + 80 + 'px';
        frekvensDiv.style.top = changeFrek.offsetTop + 'px';


        changeFeed.onclick = function () {
            feddDiv.className = 'visible menuStep';
            frekvensDiv.className = 'hidden';
        };


        changeFrek.onclick = function () {
            frekvensDiv.className = 'visible menuStep';
            feddDiv.className = 'hidden';
        };
    };

    function updateFrekvens(div) {
        var time4 = document.createElement("a")
        time4.href = "#";
        time4.onclick = function () {
            updateIntervall = 1000 * 60 * 4;
            loadFile();
        };
        time4.appendChild(document.createTextNode("4 minuter"));
        div.appendChild(time4);

        var time2 = document.createElement("a")
        time2.href = "#";
        time2.onclick = function () {
            updateIntervall = 1000 * 60 * 2;
            loadFile();
        };
        time2.appendChild(document.createTextNode("2 minuter"));
        div.appendChild(time2);

        var time3 = document.createElement("a")
        time3.href = "#";
        time3.onclick = function () {
            updateIntervall = 1000 * 60 * 3;
            loadFile();
        };
        time3.appendChild(document.createTextNode("3 minuter"));
        div.appendChild(time3);

    };

    function feedAlternativs(div) {
        var svd = document.createElement("a")
        svd.href = "#";
        svd.onclick = function () {
            currentPath = "http://www.svd.se/?service=rss";
            loadFile();
        };
        svd.appendChild(document.createTextNode("SVD - RSSfeed"));
        div.appendChild(svd);

        var aft = document.createElement("a")
        aft.href = "#";
        aft.onclick = function () {
            currentPath = "http://www.aftonbladet.se/rss.xml";
            loadFile();
        };
        aft.appendChild(document.createTextNode("Aftonbladet"));
        div.appendChild(aft);

        var dn = document.createElement("a")
        dn.href = "#";
        dn.onclick = function () {
            currentPath = "http://www.dn.se/m/rss/senaste-nytt";
            loadFile();
        };
        dn.appendChild(document.createTextNode("DN"));
        div.appendChild(dn);
    };
};

RssReader.prototype = Object.create(App.prototype);
RssReader.prototype.toString = function () {
    return "RssReader";
};