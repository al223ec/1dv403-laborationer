"use strict";
PWD.AppHandler = {
    allApps: [],
    main: null,

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
        console.log(this.allApps);
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

    displayMenu: function (e, str) {
        e.preventDefault();
        console.log(str);
        var listItems= [];
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
            PWD.removeWindow(div);
        };
        PWD.add(div);
    },
};

PWD.AppHandler.DisplayMeny = {
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
            PWD.removeWindow(div);
        };
        PWD.add(div);
    },
}; 