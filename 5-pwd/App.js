"use strict";
PWD.App = function () {
    PWD.Settings.Load(); //Vart ska jag g�ra detta?
    var dragWindow = document.createElement("div");
    this.container = document.createElement("div");
    this.footer = document.createElement("footer");
    this.dropDown = document.createElement("ul");
    this.canResize = false;

    var that = this;
    this.init = function (windowName) {
        var header = document.createElement("h4");
        header.appendChild(document.createTextNode(windowName));
        header.className = "windowName";

        var buttons = [{
            value: "X",
            className: "close",
            func: function (dragWindow) {
                return function () {
                    PWD.removeWindow(dragWindow, that);
                }
            },
        }, {
            value: "^",
            className: "minimize",
            func: function (dragWindow) {
                return function () {
                    that.minimize(dragWindow);
                };
            },
        }];
        for (var i = 0; i < buttons.length; i++) {
            var button = document.createElement("input"); 
            button.type = "button";
            button.value = buttons[i].value;
            button.className = buttons[i].className;
            button.onclick = buttons[i].func(dragWindow);
            dragWindow.appendChild(button);
        }
 
        that.dropDown.className = "appMenu";
        dragWindow.className = "drag";

        dragWindow.appendChild(header);
        dragWindow.appendChild(that.dropDown);
        dragWindow.appendChild(that.container);
        dragWindow.appendChild(that.footer);

        dragWindow.style.top = 10 + 20 * PWD.numOfWindows + 'px';
        dragWindow.style.left = 10 + 20 * PWD.numOfWindows + 'px';
        dragWindow.style.zIndex = 1010;

        if (this.canResize) {
            var resizeImage = document.createElement("img");
            resizeImage.src = 'img/drag.png';
            resizeImage.className = "resize";
            dragWindow.appendChild(resizeImage);
        }
    }; 
    this.getDragDiv = function () { return dragWindow; };
    var pwdWindow = {}; 
};

PWD.App.prototype.minimize = function (div) {
    this.minimizeHeight(div);
    this.minimizeWidth(div);
    this.minimizeTop(div);
    //div.style.display = 'none';
};

//Funktion the ultimate
PWD.App.prototype.minimizeHeight = function (div) {
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

PWD.App.prototype.minimizeWidth = function (div) {
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

PWD.App.prototype.minimizeTop = function (div) {
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
PWD.App.prototype.restore = function (div) {
    if (!div) {
        throw Error("Skicka med diven som argument");
    }
};

//H�gerclicksmeny
PWD.App.prototype.DisplayRightClickMeny = {
    main: PWD.main,
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
        PWD.add(div);
    },
};
//L�gger till en l�nk i listen
PWD.App.prototype.addDropDown = function (linkText, addQuit) {

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

PWD.App.prototype.getInput = function (prompt, func) {
    var div = document.createElement("div");
    var black = document.createElement("div");
    var form = document.createElement("form");
    var input = document.createElement("input");
    var submit = document.createElement("input");
    var h = document.createElement("h4");
    h.appendChild(document.createTextNode(prompt));

    black.className = "blackOut";
    div.className = "getInput";
    input.type = "text";
    submit.type = "submit";
    submit.value = "ok";

    form.appendChild(input);
    form.appendChild(submit);
    div.appendChild(h);
    div.appendChild(form);

    PWD.add(black);
    PWD.add(div);

    form.onsubmit = function (e) {
        e.preventDefault();
        PWD.removeWindow(black);
        PWD.removeWindow(div);
        if (func) {
            func(input.value);
        }
    };
    input.focus();
};
PWD.App.prototype.toString = function () {
    return "App"; 
}; 