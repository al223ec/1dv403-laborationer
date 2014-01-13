"use strict";
PWD.AppHandler = {
    allApps: [],

    init: function () {
        var that = this;
        that.allApps.push([PWD.App.ImageGallery.prototype.toString()]);
        that.allApps.push([PWD.App.MemoryGame.prototype.toString()]);
        that.allApps.push([PWD.App.MessageBoard.prototype.toString()]);
        that.allApps.push([PWD.App.RssReader.prototype.toString()]);
        that.allApps.push([PWD.App.Paint.prototype.toString()]);
        that.allApps.push([PWD.App.ChatBoard.prototype.toString()]);
    },

    add: function (app) {
        var that = this;
        for (var i = 0; i < that.allApps.length; i++) {
            if (that.allApps[i][0] === app.toString()) {
                that.allApps[i].push(app);
                break;
            }
        }
    },

    removeApp: function (appToRemove) {
        var that = this;
        for (var i = 0; i < that.allApps.length; i++) {
            for (var j = 0; j < that.allApps[i].length; j++) {
                if (that.allApps[i][j] === appToRemove) {
                    that.allApps[i].splice(j, 1);
                }
            }
        }
    },

    focusFunction: function (div) {
        return function () {
            PWD.dragDropObj.setFocus(div);
        }; 
    },
    displayMenu: function (e, str) {
        e.preventDefault();
        var that = this;

        var exists = false; 
        var div = document.createElement("div");
        div.className = "rightClickMenu";
        
        var ul = document.createElement("ul");
        for (var i = 0; i < that.allApps.length; i++) {
            if (that.allApps[i][0] === str) {
                for (var j = 1; j < that.allApps[i].length; j++) {
                    var li = document.createElement("li");
                    var a = document.createElement("a");
                    a.href = "#";
                    a.onclick = that.focusFunction(that.allApps[i][j].getDragDiv());
                    a.appendChild(document.createTextNode(str + " " + j));
                    li.appendChild(a);
                    ul.appendChild(li);
                    exists = true;
                } 
            }
        }
        if (exists) {
            div.appendChild(ul);
            div.onmouseleave = function () {
                PWD.removeWindow(div);
            };
            PWD.add(div);
            div.style.top = e.pageY - div.offsetHeight + 'px';
            div.style.left = e.pageX + 'px';
        }
    },
};