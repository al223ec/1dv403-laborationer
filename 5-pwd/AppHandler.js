"use strict";
PWD.AppHandler = {
    allApps: [],

    init: function () {
        //"Property index"
        this.allApps[PWD.App.ImageGallery.prototype.toString()] = [];
        this.allApps[PWD.App.MemoryGame.prototype.toString()] = [];
        this.allApps[PWD.App.MessageBoard.prototype.toString()] = [];
        this.allApps[PWD.App.RssReader.prototype.toString()] = [];
        this.allApps[PWD.App.Paint.prototype.toString()] = [];
        this.allApps[PWD.App.ChatBoard.prototype.toString()] = [];
    },

    add: function (app) {
        this.allApps[app.toString()].push(app);
    },

    removeApp: function (appToRemove) {
        var appArray = this.allApps[appToRemove.toString()]; //Referns till obj i allApps
        for (var i = 0; i < appArray.length; i++) {
            if (appArray[i] === appToRemove) {
                appArray.splice(i, 1);
            }
        }
    },

    focusFunction: function (div, app) {
        return function () {
            PWD.dragDropObj.setFocus(div, app);
        };
    },

    displayMenu: function (e, str) {
        e.preventDefault();
        var that = this;

        var exists = false;
        var div = document.createElement("div");
        div.className = "rightClickMenu";

        var ul = document.createElement("ul");
        for (var i = 0; i < that.allApps[str].length; i++) {
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.href = "#";
            a.onclick = that.focusFunction(that.allApps[str][i].getDragDiv(), that.allApps[str][i]);
            a.appendChild(document.createTextNode(str + " " + (i+1)));
            li.appendChild(a);
            ul.appendChild(li);
            exists = true;
        }
        if (exists) {
            div.appendChild(ul);
            div.addEventListener("mouseleave", function () {
                PWD.removeWindow(div);
            }, false);

            PWD.add(div);
            div.style.top = e.pageY - div.offsetHeight +10 + 'px';
            div.style.left = e.pageX -10 + 'px';
            //If true, useCapture indicates that the user wishes to initiate capture. After initiating capture, 
            //all events of the specified type will be dispatched to the registered listener before being dispatched 
            //to any EventTarget beneath it in the DOM tree. Events which are bubbling upward through the tree will 
            //not trigger a listener designated to use capture. See DOM Level 3 Events for a detailed explanation. If not specified, useCapture defaults to false.
        }
    },
};