"use strict";
PWD.App.Paint = function() {
    PWD.App.call(this);

    var paintContainer = document.createElement("div"); 
    this.tool = null;
    var tempCanvas = null;
    var that = this;

    this.start = function () {
        this.canResize = true;
        this.init("Paint");

        initDropDown(this.addDropDown("Meny", true));

        this.container.className = "container paintContainer";
        paintContainer.className = "paint";
        var canvas = document.createElement("canvas");
        canvas.className = 'contentCanvas';

        if (!canvas) {
            canvas = document.querySelector("canvas");
        }
        if (!canvas || !canvas.getContext) {
            throw Error("canvas verkar inte stödjas, eller så är inte objektet av typen canvas");
        }

        var context = canvas.getContext('2d');
        that.tool = new PWD.App.Paint.Tool(canvas, context, this.container, paintContainer);
        tempCanvas = that.tool.init();

        canvas.width = tempCanvas.width = '400';
        canvas.height = tempCanvas.height = '400';

        tempCanvas.addEventListener('mousedown', mouseDown, false);
        tempCanvas.addEventListener('mouseup', mouseUp, false);

        this.container.appendChild(paintContainer);
        return this.getDragDiv();
    };

    function mouseMove(e) {
        tempCanvas.addEventListener('mouseout', mouseUp, false);
        //Bör lösa detta bättre, beräkna vart x och y musen är och sen binda detta när x = offsetX + 10
        //var clientRect = tempCanvas.getBoundingClientRect()
        //console.log(tempCanvas.getBoundingClientRect());
        //console.log(rect.top, rect.right, rect.bottom, rect.left);
        //console.log(e.pageX);
        that.tool.startDraw(e);
    };

    function mouseDown(e) {
        PWD.dragDropObj.disable();
        if (e.target !== tempCanvas) {
            return
        }
        var x, y;
        tempCanvas.addEventListener('mousemove', mouseMove, false);

        //Vet inte ifall dessa behövs
        if (e.layerX || e.layerX == 0) { // Firefox
            x = e.layerX;
            y = e.layerY;
        } else if (e.offsetX || e.offsetX == 0) { // Opera
            x = e.offsetX;
            y = e.offsetY;
        } 
        that.tool.startPaint(x, y);

        return false;
    };

    function mouseUp(e) {
        tempCanvas.removeEventListener('mousemove', mouseMove, false);
        tempCanvas.removeEventListener('mouseout', mouseUp, false);
        that.tool.stopDraw();
        PWD.dragDropObj.enable();
    };
    //Lägg till meny alternativ här
    function initDropDown(div) {
        var restart = document.createElement("a")
        restart.href = "#";
        restart.appendChild(document.createTextNode("Ny"));

        restart.onclick = function () {
            that.tool.restart();
        };
        div.appendChild(restart);
    };
}
PWD.App.Paint.prototype = Object.create(PWD.App.prototype);