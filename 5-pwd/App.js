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
        if (!typeof listItems == 'object') { //HUr l�sa detta?
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
        quit.appendChild(document.createTextNode("St�ng"));
        div.appendChild(quit);
    }
    li.appendChild(primaryLink); 
    li.appendChild(div);
    that.dropDown.appendChild(li); 
    return div; 
};

App.prototype.getInput = function (prompt) {
    var main = document.querySelector("main");
    var div = document.createElement("div");
    var black = document.createElement("div");
    var form = document.createElement("form");
    var input = document.createElement("input");
    var submit = document.createElement("input");

    black.className = "blackOut";
    div.className = "getInput";
    input.type = "text";
    submit.type = "submit";
    submit.value = "ok";

    form.appendChild(input);
    form.appendChild(submit);
    div.appendChild(document.createTextNode(prompt));
    div.appendChild(form);

    main.appendChild(black);
    main.appendChild(div);

    form.onsubmit = function (e) {
        e.preventDefault();
        main.removeChild(black);
        main.removeChild(div);
        return "en str�ng";
    };

}; 