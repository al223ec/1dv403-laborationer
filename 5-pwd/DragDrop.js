"use strict";
//Kan vara ett "statiskt objekt"
function DragDrop(PWD) {
    document.onmousedown = OnMouseDown;
    document.onmouseup = OnMouseUp;
    var objectX;
    var objectY;
    var mouseStartX;
    var mouseStartY; 
    var targetELement; 

    this.init = function () { //H�mtar alla element som ska vara dragbara
        console.log(PWD);
    };

    function GetWidth() {
        if (self.innerHeight) { //Denna �r aktuell
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
        if (e.target.className === 'drag') {
            console.log("click");
            var target = e.target;

            objectX = target.style.left;
            objectY = target.style.top;

            mouseStartX = e.pageX;
            mouseStartY = e.pageY;
            document.onmousemove = moveWindow; //G�r detta om an�ndare klckar p� n�got dragbart

            targetELement = target;
            return false; 
        }
    }
    function OnMouseUp(e) {
        document.onmousemove = null;
        targetELement = null;
    }
    function moveWindow(e) {
        console.log(targetELement);
        console.log(targetELement.style.left);
        console.log(targetELement.style.left);
        targetELement.style.left = objectX + (e.pageX - mouseStartX) + 'px';
        targetELement.style.top = objectY + (e.pageY - mouseStartY) + 'px';
    }
};

