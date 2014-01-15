"use strict";
PWD.App.RssReader = function(){
    PWD.App.call(this);
    var container = this.container;
    var footer = this.footer; 
    var result = null;

    var intervall;
    
    //Läs inställningar
    var updateIntervall = PWD.Settings.RssReader.updateIntervall; //1000 * 60 * 4; //Var fjärde minut 
    var currentPath = PWD.Settings.RssReader.currentPath;

    var that = this;

    this.start = function () {
        this.canResize = true;
        this.init("RssReader");
        container.className = "container rssReader";
        this.addDropDown("Meny", true);
        initDropDown(this.addDropDown("Inställningar", false));
        intervall = setInterval(updateRssFeed, updateIntervall);
        updateRssFeed();
        return this.getDragDiv();
    };

    function updateRssFeed() {
        that.readFromServer("http://homepage.lnu.se/staff/tstjo/labbyServer/rssproxy/?url=", addFeedToSite, footer, "get", currentPath);

        //Spara inställningar
        PWD.Settings.RssReader.updateIntervall = updateIntervall; 
        PWD.Settings.RssReader.currentPath = currentPath;
        PWD.Settings.Save();

    };
    function addFeedToSite(xhr) {
        container.innerHTML = xhr.responseText;
    };

    function clickDropDown(that, allDivs, func) {
        return function () {
            //Börja med att gömma eventuella öppna fönster
            for (var i = 0; i < allDivs.length; i++) {
                if (that.div !== allDivs[i]) {
                    allDivs[i].className = 'hidden menuStep';
                }
            }
            that.div.style.left = this.offsetLeft + 80 + 'px';
            that.div.style.top = this.offsetTop + 'px';
            that.div.className = 'visible menuStep';
            that.funcToCall();
            this.appendChild(that.div);
        };
    };

    function initDropDown(div) {
        var links = [{
            text: "Ändra feed",
            func: function (allDivs) {
                var that = this; 
                return clickDropDown(that, allDivs, this);
            },
            div: document.createElement("div"),
            funcToCall: function () {
                return feedAlternativs(this.div);
            }
        }, {
            text: "Uppdateringsintervall",
            func: function (allDivs) {
                var that = this;
                return clickDropDown(that, allDivs, this);
            },
            div: document.createElement("div"),
            funcToCall: function () {
                return updateFrekvens(this.div);
            },
        }];

        var allDivs = [];
        for (var j = 0; j < links.length; j++) {
            allDivs.push(links[j].div);
        }
        for (var i = 0; i < links.length; i++) {
            var a = document.createElement("a");
            a.href = "#";
            a.onclick = links[i].func(allDivs);
            a.appendChild(document.createTextNode(links[i].text));
            div.appendChild(a);
        }
    };

    function updateFrekFunc(obj) {
        return function () {
            clearInterval(intervall);
            updateIntervall = obj.time;
            intervall = setInterval(updateRssFeed, updateIntervall);
            updateRssFeed();
        };
    };

    function updateFrekvens(div) {
        div.innerHTML = '';
        var links = [
            { text: "4 minuter", time: 1000 * 60 * 4, },
            { text: "2 minuter", time: 1000 * 60 * 2, },
            { text: "3 minuter", time: 1000 * 60 * 3, },
            { text: "5 minuter", time: 1000 * 60 * 5, },
            { text: "6 minuter", time: 1000 * 60 * 6, }
        ];

        for (var i = 0; i < links.length; i++) {
            var a = document.createElement("a");
            a.onclick = updateFrekFunc(links[i]);
            a.href = "#";
            a.appendChild(document.createTextNode(links[i].text));
            div.appendChild(a);
        }
    };

    function feedAlternativsFunc(obj) {
        return function () {
            currentPath = obj.path;
            updateRssFeed();
        };
    }; 

    function feedAlternativs(div) {
        div.innerHTML = '';
        var links = [
            { text: "SVD -rssFeed", path: "http://www.svd.se/?service=rss", },
            { text: "Aftonbladet", path: "http://www.aftonbladet.se/rss.xml", },
            { text: "DN", path: "http://www.dn.se/m/rss/senaste-nytt", }
        ];

        for (var i = 0; i < links.length; i++) {
            var a = document.createElement("a");
            a.onclick = feedAlternativsFunc(links[i]);
            a.href = "#";
            a.appendChild(document.createTextNode(links[i].text));
            div.appendChild(a);
        }
    };
};

PWD.App.RssReader.prototype = Object.create(PWD.App.prototype);
PWD.App.RssReader.prototype.toString = function () {
    return "RssReader";
};
PWD.App.RssReader.prototype.readFromServer = function (path, func, footer, type, currentPath, args) {
    var startTime = new Date();
    var timeout = setTimeout(displayFooter, 200);
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        try {
            if (xhr.readyState == 4) { //redy state 4 == Complete  3 == recieveing This kan inte användas i detta fall pga Browser kompatibilitet
                clearTimeout(timeout);
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {//lyckat
                    while (footer.firstChild) {
                        footer.removeChild(footer.firstChild);
                    }
                    var date = new Date();
                    var format = function (num) {
                        if (num < 10) {
                            return '0' + num;
                        } else {
                            return num;
                        }
                    }
                    footer.appendChild(
                        document.createTextNode("Detta tog: " + (date.getTime() - startTime.getTime()) / 1000 + "s " +
                        "Uppdaterades: " + format(date.getHours()) + ":" + format(date.getMinutes()) + ":" + format(date.getSeconds())));
                    func(xhr);
                    PWD.fixBounds();
                } else {//misslyckades
                    throw Error(xhr.status);
                }
            }
        } catch (ex) {
            console.log(ex);
        }
    };

    if (currentPath) {
        xhr.open(type, path + escape(currentPath), true);
        xhr.send(null);
    } else if (args) {
        xhr.open(type, path, true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(args);
        console.log("Arguments");
    } else {
        xhr.open(type, path, true);
        xhr.send(null);
    }

    function displayFooter() {
        footer.innerHTML = '';
        var img = document.createElement("img");
        img.src = 'img/loader.gif';
        footer.appendChild(img);
        footer.appendChild(document.createTextNode("Laddar..."));
    };
};