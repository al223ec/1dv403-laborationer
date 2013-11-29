"use strict";

var _startX = 0;            // mouse starting positions
var _startY = 0;
var _offsetX;           // current element offset
var _offsetY;
var dragElement;           // needs to be passed from OnMouseDown to OnMouseMove
var allDragElements;

//var _debug = document.querySelector("#debug"); //$('debug');    // makes life easier

function InitDragDrop() {
    document.onmousedown = OnMouseDown;
    document.onmouseup = OnMouseUp;
}

function OnMouseDown(e) {
    // IE is retarded and doesn't pass the event object
    if (e == null)
        e = window.event;

    // IE uses srcElement, others use target
    var target = e.target != null ? e.target : e.srcElement;
    console.log(target);
    //_debug.innerHTML = target.className == 'drag'
    //    ? 'draggable element clicked'
    //    : 'NON-draggable element clicked';

    // for IE, left click == 1
    // for Firefox, left click == 0

    var className = target.className;
    if ((e.button == 1 && window.event != null ||
        e.button == 0) &&
         className.indexOf("drag") !== -1) {
        // grab the mouse position
        _startX = e.clientX;
        _startY = e.clientY;

        // grab the clicked element's position
        _offsetX = ExtractNumber(target.style.left);
        _offsetY = ExtractNumber(target.style.top);

        target.style.zIndex = 1000;

        // we need to access the element in OnMouseMove
        dragElement = target;

        // tell our code to start moving the element with the mouse
        document.onmousemove = OnMouseMove;

        allDragElements = document.querySelectorAll("div.drag");
        console.log(allDragElements.length);
        for (var i = 0; i < allDragElements.length; i += 1) {
            if (allDragElements[i] !== dragElement) {
                if (allDragElements[i].style.zIndex > 10) {
                    allDragElements[i].style.zIndex -= 10;
                } else {
                    allDragElements[i].style.zIndex = 0;
                }
            }
        }

        // cancel out any text selections
        document.body.focus();
        // prevent text selection in IE
        document.onselectstart = function () { return false; };
        // prevent IE from trying to drag an image
        target.ondragstart = function () { return false; };
        // prevent text selection (except IE)
        return false;
    }
}

function OnMouseMove(e) {
    if (e == null)
        var e = window.event;
    // this is the actual "drag code"
    dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
    dragElement.style.top = (_offsetY + e.clientY - _startY) + 'px';

    //console.log(dragElement.style.left + ', ' + dragElement.style.top);
}

function OnMouseUp(e) {
    if (dragElement != null) {
        // we're done with these events until the next OnMouseDown
        document.onmousemove = null;
        document.onselectstart = null;
        dragElement.ondragstart = null;

        // this is how we know we're not dragging      
        dragElement = null;

        //_debug.innerHTML = 'mouse up';
    }
}

function ExtractNumber(value) {
    var n = parseInt(value);
    return n == null || isNaN(n) ? 0 : n;
}


InitDragDrop();