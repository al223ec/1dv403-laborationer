"use strict";
function WindowCreator(PWD) {
    var that = this;
    var dragWindows = []; 
    dragWindows.push(["app0"]);
    dragWindows.push(["app1"]);
    dragWindows.push(["app2"]);

    this.add = function (content, type) {
        var newWindow = new DragWindow(that);
        console.log(dragWindows.length);
        dragWindows[0].push(newWindow);
        console.log(dragWindows);
        return dragWindows[0][dragWindows[0].length - 1].add();
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

