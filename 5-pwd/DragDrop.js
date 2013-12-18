"use strict";
//Kan vara ett "statiskt objekt"
function DragDrop() {
    document.onmousedown = OnMouseDown;
    document.onmouseup = OnMouseUp;

    this.init = function () { //Hämtar alla element som ska vara dragbara
        console.log(GetHeight());
        console.log(GetWidth());
    };

    function GetWidth() {
        if (self.innerHeight) { //Denna är aktuell
            return self.innerWidth;
        }
        else if (document.documentElement && document.documentElement.clientHeight) {
            return document.documentElement.clientWidth;
        }
        else if (document.body) {
            return document.body.clientWidth;
        }
        return 0;
    }

    function GetHeight() {
        if (self.innerHeight) { //Denna
            return self.innerHeight;
        }
        else if (document.documentElement && document.documentElement.clientHeight) {
            return document.documentElement.clientHeight;
        }
        else if (document.body) {
            return document.body.clientHeight;
        }
        return 0;
    }

    function OnMouseDown(e) {
        console.log(e); 
    }
    function OnMouseUp(e) {
        console.log(e);
    }
};

window.onload = function () {
    var dragDrop = new DragDrop();
    dragDrop.init();
    console.log(dragDrop);

    console.log(window);

};