"use strict";
PWD.App = function () {
    PWD.Settings.Load(); //Vart ska jag g�ra detta?
    var dragWindow = document.createElement("div");
    this.container = document.createElement("div");
    this.footer = document.createElement("footer");
    this.dropDown = document.createElement("ul");
    this.canResize = false;

    this.restoreHeight = 0;
    this.restoreWidth = 0;
    this.restoreTop = 0; 
    this.isMinimized = false;

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

        dragWindow.style.top = 10 + 20 * 0 + 'px';
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
};

PWD.App.prototype.minimize = function (div) {
    //this.restoreHeight = div.offsetHeight;
    this.restoreWidth = div.offsetWidth;
    this.restoreTop = div.offsetTop;

    //this.minimizeHeight(div);
    //this.minimizeWidth(div);
    this.minimizeTop(div);
    this.isMinimized = true; 
};

//Funktion the ultimate
//PWD.App.prototype.minimizeHeight = function (div) {
//    var height = div.offsetHeight;
//    var numOfSteps = height / 10;
//    function step() {
//        div.style.height = height + 'px';
//        if (height > 0) {
//            height -= numOfSteps;
//            setTimeout(step, 5);
//        }
//    }
//    setTimeout(step, 5);
//};

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
    var toBottom = PWD.height - div.offsetTop;
    var currentTop = div.offsetTop;
    var numOfSteps = toBottom / 10;

    function step() {
        div.style.top = currentTop + 'px';
        if (currentTop < toBottom) {
            currentTop += numOfSteps;
            setTimeout(step, 2);
        } else {
            div.style.display = 'none';
        }
    }
    setTimeout(step, 2);
};

PWD.App.prototype.restore = function () {
    var div = this.getDragDiv();

    div.style.width = this.restoreWidth + 'px';
    div.style.top = this.restoreTop + 'px';
    div.style.display = "block";
    this.isMinimized = false;
};

//H�gerclicksmeny
PWD.App.prototype.DisplayRightClickMeny = {

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

        div.style.top = e.pageY -5 + 'px';
        div.style.left = e.pageX -5 + 'px';

        div.addEventListener("mouseleave", function () {
            PWD.removeWindow(div);
        }, false);
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
        div.addEventListener("mouseleave", function () {
            var alHidden = document.querySelectorAll(".visible");
            for (var i = 0; i < alHidden.length; i++) {
                alHidden[i].className = "hidden";
            }
            div.className = "hidden"; 
        },false);
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