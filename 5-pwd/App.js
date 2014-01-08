"use strict";
function App() {
    var dragWindow = document.createElement("div");
    this.container = document.createElement("div");
    this.footer = document.createElement("footer");
    this.dropDown = document.createElement("ul");

    var that = this;
    this.init = function (windowName) {
        console.log("initfunktionen");

        var header = document.createElement("h4");

        var closeButton = document.createElement("input");
        closeButton.type = "button";
        closeButton.value = "X";
        closeButton.className = "close";
        closeButton.onclick = function (e) {
            PWD.removeWindow(dragWindow);
        };

        var minimizeButton = document.createElement("input");
        minimizeButton.type = "button";
        minimizeButton.value = "^";
        minimizeButton.className = "minimize";
        minimizeButton.onclick = function (e) {
            that.minimize(dragWindow);
        };

        that.dropDown.className = "appMenu";

        dragWindow.className = "drag";
        dragWindow.appendChild(minimizeButton);
        dragWindow.appendChild(closeButton);

        header.appendChild(document.createTextNode(windowName));
        header.className = "windowName";

        dragWindow.appendChild(header);
        dragWindow.appendChild(that.dropDown);
        dragWindow.appendChild(that.container);
        dragWindow.appendChild(that.footer);


        dragWindow.style.top = 10 + 20 * PWD.numOfWindows + 'px';
        dragWindow.style.left = 10 + 20 * PWD.numOfWindows + 'px';

        dragWindow.style.zIndex = 1010;
    }; 
    this.getDragDiv = function () { return dragWindow; };
};

App.prototype.minimize = function (div) {
    this.minimizeHeight(div);
    this.minimizeWidth(div);
    this.minimizeTop(div);
    //div.style.display = 'none';
};


//Funktion the ultimate
App.prototype.minimizeHeight = function (div) {
    var height = div.offsetHeight;
    var numOfSteps = height / 10;
    function step() {
        div.style.height = height + 'px';
        if (height > 0) {
            height -= numOfSteps;
            setTimeout(step, 5);
        }
    }
    setTimeout(step, 5);
};

App.prototype.minimizeWidth = function (div) {
    var width = div.offsetWidth;
    var numOfSteps = width / 10;
    function step() {
        div.style.width = width + 'px';
        if (width > 0) {
            width -= numOfSteps;
            setTimeout(step, 5);
        }
    }
    setTimeout(step, 5);
};

App.prototype.minimizeTop = function (div) {
    var top = +(div.style.top.replace(/[^0-9\-]/g, ''));
    var numOfSteps = top;

    function step() {
        div.style.top = top + 'px';
        if (top < (self.innerHeight)) {
            top += numOfSteps;
            setTimeout(step, 1);
        } else {
            div.style.display = 'none';
        }
    }
    setTimeout(step, 1);
};
App.prototype.restore = function (div) {
    if (!div) {
        throw Error("Skicka med diven som argument");
    }
};

App.prototype.DisplayMeny = {
    main: document.querySelector("main"),

    init: function (listItems, e) { //Skicka med a taggar
        e.preventDefault();
        if (!typeof listItems == 'object') { //HUr lösa detta?
            throw Error("Skicka object");
        }

        var that = this;
        var div = document.createElement("div");
        div.className = "rightClickMenu";

        var ul = document.createElement("ul");

        for (var i = 0; i < listItems.length; i++) {
            var li = document.createElement("li");
            li.appendChild(listItems[i]);
            ul.appendChild(li);
        }

        div.appendChild(ul);

        div.style.top = e.pageY + 'px';
        div.style.left = e.pageX + 'px';

        div.onmouseleave = function () {
            that.main.removeChild(div);
        };
        that.main.appendChild(div);
    },
};
App.prototype.addDropDown = function (linkText, addQuit) {
    var li = document.createElement("li");
    li.className = "dropDownLink";
    var primaryLink = document.createElement("a");
    primaryLink.href = "#"; 
    primaryLink.appendChild(document.createTextNode(linkText));
    var that = this;

    primaryLink.onclick = function(){
        div.className = "visible"; 
        that.dropDown.onmouseleave = function () {
            var alHidden = document.querySelectorAll(".visible");
            for (var i = 0; i < alHidden.length; i++) {
                alHidden[i].className = "hidden";
            }
            div.className = "hidden"; 
        };
    }; 
    
    var div = document.createElement("div");
    div.className = "hidden";
    if (addQuit) {
        var quit = document.createElement("a")
        quit.href = "#";
        quit.onclick = function () {
            PWD.removeWindow(that.getDragDiv());
        };
        quit.appendChild(document.createTextNode("Stäng"));
        div.appendChild(quit);
    }
    li.appendChild(primaryLink); 
    li.appendChild(div);
    that.dropDown.appendChild(li); 
    return div; 
};

function ReadFromServer (path, func, footer, currentPath) {
    var startTime = new Date();
    var timeout = setTimeout(displayFooter, 200);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        try {
            if (xhr.readyState == 4) { //redy state 4 == Complete  3 == recieveing This kan inte användas i detta fall pga Browser kompatibilitet
                clearTimeout(timeout);
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {//lyckat
                    func(xhr.responseText);
                    PWD.fixBounds();
                    while (footer.firstChild) {
                        footer.removeChild(footer.firstChild);
                    }
                    footer.appendChild(document.createTextNode("Detta tog: " + (new Date().getTime() - startTime.getTime()) + "ms " + "Detta uppdaterades: " + new Date().toString()));
                } else {//misslyckades
                    throw Error(xhr.status);
                }
            }
        } catch (ex) {
            console.log(ex);
        }
    };
    if (currentPath) {
        xhr.open("get", path + escape(currentPath), true);
    }
    else {
        xhr.open("get", path, true);
    }
    xhr.send(null);

    function displayFooter() {
        var img = document.createElement("img");
        img.src = 'img/loader.gif';
        footer.appendChild(img);
        footer.appendChild(document.createTextNode("Laddar..."));
    };
};