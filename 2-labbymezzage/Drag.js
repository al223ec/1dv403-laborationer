"use strict";
function Drag() {
    var mouseStartX = 0;            // mouse starting positions
    var mouseStartY = 0;
    var _offsetX = 0; // Det aktuella objektets X kordinat 
    var _offsetY = 0;
    var dragElement;           // needs to be passed from OnMouseDown to OnMouseMove
    var allDragElements;

    this.InitDragDrop = function () {
        document.onmousedown = OnMouseDown;
        document.onmouseup = OnMouseUp;
        //document.onmousemove = function (e) {
        //    console.log(e.pageX + "x " + e.pageY +"y"); 
        //};
    };

    function OnMouseDown(e) {
        // IE is retarded and doesn't pass the event object
        if (e == null) { e = window.event; }
        var target = e.target != null ? e.target : e.srcElement; // IE uses srcElement, others use target

        if ((e.button == 1 && window.event != null || e.button == 0) && target.className.indexOf("drag") !== -1) {
            //Fixa z index 
            allDragElements = document.querySelectorAll("div.drag");
            for (var i = 0; i < allDragElements.length; i += 1) {
                if (allDragElements[i] !== dragElement) {
                    if (allDragElements[i].style.zIndex > 10) {
                        allDragElements[i].style.zIndex -= 10;
                    } else {
                        allDragElements[i].style.zIndex = 0;
                    }
                }
            }
            //Hämta pekar position
            //mouseStartX = e.clientX;
            //mouseStartY = e.clientY;
            mouseStartX = e.pageX;
            mouseStartY = e.pageY;

            // grab the clicked element's position
            _offsetX = ExtractNumber(target.style.left);
            _offsetY = ExtractNumber(target.style.top);

            target.style.zIndex = 1000;

            // we need to access the element in OnMouseMove
            dragElement = target;
            // tell our code to start moving the element with the mouse
            document.onmousemove = OnMouseMove;

            // cancel out any text selections
            document.body.focus();
            // prevent text selection in IE
            document.onselectstart = function () { return false; };
            // prevent IE from trying to drag an image
            target.ondragstart = function () { return false; };
            // prevent text selection (except IE)
            return false;
        }
        else if (target.className.indexOf("board") !== -1) { //sätter focus

            target.style.zIndex = 1010;
            console.log(target + " ej dragable");
            //do {
            //    target = target.parentNode;
            //    console.log(target);
            //}
            //while (target != document.getElementById("main"));
        }
    };

    function OnMouseMove(e) {
        if (e == null)
            var e = window.event;
        // this is the actual "drag code"
       dragElement.style.left = (_offsetX + e.clientX - mouseStartX) + 'px'; //Förändrar objektets position med hjälp av förändringen på pekarens position
       dragElement.style.top = (_offsetY + e.clientY - mouseStartY) + 'px';
    };

    function OnMouseUp(e) {
        if (dragElement != null) {
            // we're done with these events until the next OnMouseDown
            document.onmousemove = null;
            document.onselectstart = null;
            dragElement.ondragstart = null;

            //Nollställa dragElementet, nu vet vi att användaren inte drar
            dragElement = null;
        }
    }; 

    function ExtractNumber(value) {
        var n = parseInt(value);
        return n == null || isNaN(n) ? 0 : n;
    };
}
//http://javascript.info/tutorial/mouse-events#cross-browser-approach
//document.getElementById('ball2').onmousedown = function () {
//    this.style.position = 'absolute'

//    var self = this

//    document.onmousemove = function (e) {
//        e = e || event
//        fixPageXY(e)

//        self.style.left = e.pageX - 25 + 'px'
//        self.style.top = e.pageY - 25 + 'px'
//    }
//    this.onmouseup = function () {
//        document.onmousemove = null
//    }
//}

//document.getElementById('ball2').ondragstart = function () { return false }
