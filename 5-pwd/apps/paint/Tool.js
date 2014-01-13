"use strict";
PWD.App.Paint.Tool = function(canvas, context, container, paint) {
    var tempCanvas = document.createElement("canvas"); //Kommer hålla den temporära canvasen för att ordna live feedback och undvicka att rita ut massor av rektanglar
    var tempContext;

    var isPainting = false;
    var startX, startY;

    var selectTool; // = document.getElementById("tools");//funkar inte när man ska ha flera appar samtidigt
    var selectSize;// = document.getElementById("size");
    var colorpicker; 

    var endX, endY; 

    var currentTool;

    this.init = function () {
        tempCanvas.className = "tempCanvas";
        tempContext = tempCanvas.getContext('2d');

        var allTools = new this.SelectTool();
        container.appendChild(allTools.init());

        selectTool = allTools.tool;
        selectSize = allTools.size;

        if (!selectTool || !selectSize) {
            throw Error("Verkar inte hitta select elementen WTF!?!");
        }
        currentTool = selectTool.value;
        colorpicker = new this.Colorpicker();

        paint.appendChild(canvas);
        paint.appendChild(tempCanvas);

        paint.appendChild(colorpicker.init());
        return tempCanvas; 
    };

    this.startPaint = function (x, y) {
        startX = x;
        startY = y;
        currentTool = selectTool.value;
    };

    this.startDraw = function (e) {
        var size = +selectSize.value;
        if (isNaN(size)) {
            size = 1;
        }
        if (size > 10) {
            size = 10;
        }
        if (e.offsetX || e.offsetY) { //Firefox har inte e.offsetX/Y utan e.layerX/Y
            endX = e.offsetX;
            endY = e.offsetY;
        } else {
            endX = e.layerX;
            endY = e.layerY;
        }

        if (currentTool === 'pencil') {
            drawPencil(e, size);
        } else if (currentTool === 'rect') {
            drawRectangle(e, size);
        } else if (currentTool === 'line') {
            drawLine(e, size); 
        } else if (currentTool === 'circle') {
            drawCircle(e, size); 
        }
    };

    function drawPencil(e, size) {
        tempContext.strokeStyle = colorpicker.getColor();
        tempContext.lineWidth = size;

        if (!isPainting) {
            tempContext.beginPath();
            tempContext.moveTo(startX, startY);
            isPainting = true;
        } else {
            tempContext.lineTo(endX, endY);
            tempContext.stroke();
        }
    };

    function drawRectangle(e, size) {
        isPainting = true;
        tempContext.strokeStyle = colorpicker.getColor();
        tempContext.lineWidth = size;

        var x = Math.min(endX, startX),
            y = Math.min(endY, startY),
            w = Math.abs(endX - startX),
            h = Math.abs(endY - startY);
        
        tempContext.clearRect(0, 0, canvas.width, canvas.height);

        if (!w || !h) {//Kontrollera ifall något ar NaN inna det används
            return;
        }
        tempContext.strokeRect(x, y, w, h);
    };

    function drawLine(e, size) {
        tempContext.clearRect(0, 0, canvas.width, canvas.height);

        tempContext.lineWidth = size; 

        tempContext.strokeStyle = colorpicker.getColor();

        tempContext.beginPath();
        tempContext.moveTo(startX, startY);
        tempContext.lineTo(endX, endY);
        tempContext.stroke();
        tempContext.closePath();
    };

    function drawCircle(e, size) {
        tempContext.clearRect(0, 0, canvas.width, canvas.height);

        tempContext.strokeStyle = colorpicker.getColor();
        tempContext.lineWidth = size;
        tempContext.beginPath();
        
        var w = Math.abs(endX - startX),
        h = Math.abs(endY - startY);

        var radius;  //(w > h) ? h : w; läs på om denna
        if (w > h) {
            radius = w;
        } else {
            radius = h;
        }
        tempContext.moveTo(startX, startY);
        tempContext.beginPath();
        tempContext.arc(startX, startY, radius, 0, 2 * Math.PI);
        tempContext.stroke(); 
    };

    function canvasUpdate() {
        context.drawImage(tempCanvas, 0, 0);
        tempContext.clearRect(0, 0, canvas.width, canvas.height);
    };

    this.restart = function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    this.stopDraw = function () {
        canvasUpdate(); //Färdig med ritandet, kopiera det vi ritat i Tempcanvas till canvas
        isPainting = false;
    };
}

PWD.App.Paint.Tool.prototype.Colorpicker = function () {
    var currentColor = '#000000'; 
    var colors = ['#000000','#0000FF', '#00FF00', '#FF0000', '#ce6cbb', '#86d684', '#5dc859', '#ffffff'];
    var that = this; 

    this.init = function () {
        var ul = document.createElement("ul");
        for (var i = 0; i < colors.length; i++) {
            ul.appendChild(new ColorSwatch(that, colors[i]).init()); 
        }
        return ul; 
    };

    this.setCurrentColor = function (color) {
        currentColor = color; 
    };
    this.getColor = function () {
        return currentColor; 
    };

    function ColorSwatch(colorpicker, color) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#";

        a.onclick = function () {
            colorpicker.setCurrentColor(color);
        };
        this.init = function () {
            li.appendChild(a);
            a.style.backgroundColor = color;
            return li;
        };
    };
};

PWD.App.Paint.Tool.prototype.SelectTool = function(){
    var p = document.createElement("p");
    this.tool = null;
    this.size = null;
    var that = this;

    this.init = function(){
        initTools(); 
        initSize(); 
        return p; 
    };

    function initTools() {
        var label = document.createElement("label");
        var select = document.createElement("select");
        select.class = "tools";
        var text = document.createTextNode("Tool: ");
        label.appendChild(text);

        p.appendChild(label); 
        var values = ['rect','pencil','line','circle']; 
        var text = ['Rektangel', 'Penna', 'Linje', 'Cirkel'];

        for (var i = 0; i < values.length; i++) {
            var option = document.createElement("option");
            option.value = values[i];
            option.appendChild(document.createTextNode(text[i])); 
            select.appendChild(option);
        }
        label.appendChild(select);
        p.appendChild(label);

        that.tool = select;
    };

    function initSize() {
        var label = document.createElement("label");
        var text = document.createTextNode("Stroke size: ");
        var input = document.createElement("input");
        input.type = 'number';
        input.min = 1;
        input.max = 10;
        input.className = "size";

        label.appendChild(text);
        label.appendChild(input);
        p.appendChild(label);

        that.size = input;
    };
};