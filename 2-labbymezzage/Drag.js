"use strict";
var Drag = function drag() {
    var mouseStartX = 0;            // mouse starting positions
    var mouseStartY = 0;
    var objectX = 0; // Det aktuella objektets X kordinat 
    var objectY = 0;
    var dragElement;           // needs to be passed from OnMouseDown to OnMouseMove
    var allDragElements;

    this.InitDragDrop = function () {
        document.onmousedown = OnMouseDown;
        document.onmouseup = OnMouseUp;
        allDragElements = document.querySelectorAll("div.drag");
    };

    function OnMouseDown(e) {
        // IE is retarded and doesn't pass the event object
        if (e == null) { e = window.event; }
        var target = e.target != null ? e.target : e.srcElement; // IE uses srcElement, others use target

        if ((e.button == 1 && window.event != null || e.button == 0) && target.className.indexOf("drag") !== -1) {
            //Fixa z index 
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
            // .clientX Returns the horizontal coordinate within the application's client area at which 
            //the event occurred (as opposed to the coordinates within the page). For example, 
            //clicking in the top-left corner of the client area will always result in a mouse event with 
            //a clientX value of 0, regardless of whether the page is scrolled horizontally.
            // .pageX Returns the horizontal coordinate of the event relative to whole document.
            mouseStartX = e.pageX;
            mouseStartY = e.pageY; 
            
            // grab the clicked element's position
            objectX = ExtractNumber(target.style.left);
            objectY = ExtractNumber(target.style.top);

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
        else if (target.className.indexOf("board") !== -1) { //sätter focus om man klickar på ett av fönstren
            for (var i = 0; i < allDragElements.length; i += 1) {
                if (allDragElements[i] !== target.parentElement) {
                    if (allDragElements[i].style.zIndex > 10) {
                        allDragElements[i].style.zIndex -= 10;
                    } else {
                        allDragElements[i].style.zIndex = 0;
                    }
                }
            }
            target.parentElement.style.zIndex = 1000;
        }
    };

    function OnMouseMove(e) {
        if (e == null)
            var e = window.event;
        // this is the actual "drag code"
        dragElement.style.left = (objectX + e.pageX - mouseStartX) + 'px'; //Förändrar objektets position med hjälp av förändringen på pekarens position
        dragElement.style.top = (objectY + e.pageY - mouseStartY) + 'px';
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
