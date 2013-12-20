"use strict";
//Kan vara ett "statiskt objekt"
function DragDrop(PWD) {
    if (!PWD) { throw Error("Detta objekt måste ha en referens till PWO när det skapas"); } //Detta kan utvecklas
    document.onmousedown = onMouseDown;
    document.onmouseup = onMouseUp;
    var objectX;
    var objectY;
    var mouseStartX;
    var mouseStartY; 
    var targetELement; 

    this.init = function () { //Hämtar alla element som ska vara dragbara
        console.log(PWD);
    };

    //getWidth och height beräknar anändarens höjd resp bredd
    function getWidth() {
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

    function getHeight() {
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

    function onMouseDown(e) {
        console.log(e.target.parentNode);
        if (e.target.className === 'drag') {
            targetELement = e.target;
        } else if (e.target.parentNode.className === 'drag') {
            targetELement = e.target.parentNode;
        } else {
            targetELement = null; 
        }
        if (targetELement === null) { return; }
        //Fixa browsersupport
            
        objectX = +(targetELement.style.left.replace(/[^0-9\-]/g, '')); //Måste ta bort px, annars blir resultatet NaN +omvandling
        objectY = +(targetELement.style.top.replace(/[^0-9\-]/g, ''));

        mouseStartX = e.pageX;
        mouseStartY = e.pageY;

        document.onmousemove = moveWindow; //Gör detta om anändare klckar på något dragbart

        return false; 
    }
    function onMouseUp(e) {
        if (targetELement) { //Behöver endast göras om användaren faktiskt har tryckt på en "dragable" div
            document.onmousemove = null;
            targetELement = null;
        }
    }

    function moveWindow(e) {
        var nextXPos = objectX + e.pageX - mouseStartX; 
        //Xleds kontroll
        if (targetELement.offsetWidth + nextXPos < PWD.width) {
            targetELement.style.left = nextXPos + 'px';
        } else {
            targetELement.style.left = PWD.width - targetELement.offsetWidth +'px';
        }
        if (nextXPos < 0) {
            targetELement.style.left = '0px';
        }

        //yleds kontroll
        var nextYPos = objectY + e.pageY - mouseStartY; 
        if ((targetELement.offsetHeight + nextYPos) < PWD.height) {
            if (nextYPos < 0) {
                targetELement.style.top = '0px';
            } else {
                targetELement.style.top = nextYPos + 'px';
            }
        } else {
            targetELement.style.top = PWD.height - targetELement.offsetHeight + 'px';
        }
    }
};

