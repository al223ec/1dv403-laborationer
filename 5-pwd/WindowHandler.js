"use strict";
function WindowHandler(PWD) {
    var that = this;
    var dragWindows = [];
    dragWindows.push(['ImageGallery']);
    dragWindows.push(['MemoryGame']);
    dragWindows.push(["app2"]);
    
    var numberOfWindows = 0;

    this.add = function (app) {
        console.log(dragWindows);
        var newWindow = new DragWindow(that);
        for (var i = 0; i < dragWindows.length; i++) {
            if (dragWindows[i][0] === app.getName()) {
                dragWindows[i].push(newWindow);
                return newWindow.add(app.getName() + numberOfWindows++, app); 
            }
        }
    }; 

    this.removeWindow = function (div, windowToRemove) {
        for (var i = 0; i < dragWindows.length; i++) {
            for (var j = 0; j < dragWindows[i].length; j++) {
                if (dragWindows[i][j] === windowToRemove) {
                    dragWindows[i].splice(j, 1);
                }
            }
        }
        div.parentNode.removeChild(div);
    }; 
}; 

