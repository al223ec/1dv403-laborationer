"use strict";
var PWD = {//statiska objektet som startar applikationen
    //Denna klass ska sköta hanteringen av vilka applikationer som ska startas.
    main: document.querySelector("main"),
    width: 1920,
    height: 946,
    numOfWindows: 0,
    dragDropObj: null,

    init: function () {
        document.onselectstart = function () { return false; }
        //intiera alla objekt här
        this.dragDropObj = new this.dragDrop();
        this.dragDropObj.init();
        var that = this;

        var imageGallery = document.querySelector("#appImage");
        imageGallery.onclick = function () {
            var newGallery = new PWD.App.ImageGallery();
            that.add(newGallery.start());
            that.numOfWindows++;
        };

        var memory = document.querySelector("#appMemory");
        memory.onclick = function () {
            var mGame = new PWD.App.MemoryGame();
            that.add(mGame.start());
            that.numOfWindows++;
        };

        var messBoard = document.querySelector("#appMessage");
        messBoard.onclick = function () {
            var mBoard = new PWD.App.MessageBoard();
            that.add(mBoard.start());
            that.numOfWindows++;
        };

        var reader = document.querySelector("#appRssReader");
        reader.onclick = function () {
            var reader = new PWD.App.RssReader();
            that.add(reader.start());
            that.numOfWindows++;
        };
        var chat = document.querySelector("#appChat");
        chat.onclick = function () {
            var newChat = new PWD.App.ChatBoard();
            that.add(newChat.start());
            that.numOfWindows++;
        };

        var paint = document.querySelector("#appPaint");
        paint.onclick = function () {
            var newPaint = new PWD.App.Paint();
            that.add(newPaint.start());
            that.numOfWindows++;
        };
    },

    add: function (div) {
        this.main.appendChild(div);
        this.fixBounds();
    },

    removeWindow: function (div) {
        this.main.removeChild(div);
    },

    fixBounds: function () {
        var allDragElements = this.main.querySelectorAll(".drag");
        for (var i = 0; i < allDragElements.length; i++) {
            if (allDragElements[i].offsetWidth + +allDragElements[i].style.left.replace(/[^0-9]/g, '') > PWD.width) {
                allDragElements[i].style.left = PWD.width - allDragElements[i].offsetWidth - 40 + 'px';
            }
            if (allDragElements[i].offsetHeight + +allDragElements[i].style.top.replace(/[^0-9]/g, '') > PWD.height) {
                allDragElements[i].style.top = PWD.height - allDragElements[i].offsetHeight - 40 + 'px';
            }
        }
    },
    //Detta objekt sköter drag drop funktionaliteten
    //kan också vara statiskt
    dragDrop: function () {
        var objectX = 0;
        var objectY = 0;
        var mouseStartX = 0;
        var mouseStartY = 0;
        var targetELement = null;
        var allDragElements = null;
        var isResizing = false; 

        this.init = function () {
            document.addEventListener("mousedown",onMouseDown, false);
            document.addEventListener("mouseup", onMouseUp, false);
            PWD.width = getWidth();
            PWD.height = getHeight();
        };

        this.disable = function () {
            console.log("dragdrop is disabled");
            document.removeEventListener("mousedown", onMouseDown, false);
            document.removeEventListener("mouseup", onMouseUp, false);
        };
        this.enable = function () {
            document.addEventListener("mousedown", onMouseDown, false);
            document.addEventListener("mouseup", onMouseUp, false);
        };
        //getWidth och height beräknar anändarens aktuella höjd resp bredd
        function getWidth() {
            if (self.innerWidth) { //Denna är aktuell
                return self.innerWidth;
            }
            else if (document.documentElement && document.documentElement.clientWidth) {
                return document.documentElement.clientWidth;
            }
            else if (document.body) {
                return document.body.clientWidth;
            }
            return 0;
        };

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
        };

        function onMouseDown(e) {
            if (e.target.className == "resize") {

                targetELement = e.target.parentNode;
                setFocus();

                objectX = targetELement.offsetWidth;
                objectY = targetELement.querySelector(".container").offsetHeight; //Måste påverka container i y led annars kukar det ur

                mouseStartX = e.pageX;
                mouseStartY = e.pageY;

                document.addEventListener("mousemove", resizeWindow, false);
                isResizing = true;
                window.ondragstart = function () { return false; }
                return false;
            }
            //Kontrollerar ifall det man klicker på är drag, gör detta ett steg upp i trädet
            if (e.target.className === 'drag') {
                targetELement = e.target;
            } else if (e.target.parentNode && e.target.parentNode.className === 'drag') {
                targetELement = e.target.parentNode;
            }
            if (!targetELement) {
                return;
            }
            //Fokus
            setFocus();

            objectX = +(targetELement.style.left.replace(/[^0-9\-]/g, '')); //Måste ta bort px, annars blir resultatet NaN +omvandling
            objectY = +(targetELement.style.top.replace(/[^0-9\-]/g, ''));

            mouseStartX = e.pageX;
            mouseStartY = e.pageY;

            document.addEventListener("mousemove", moveWindow, false); //Gör detta om anändare klckar på något dragbart

            //Fixa browsersupport här, så inte text markeras etc
            return false;
        };
        function setFocus() {
            allDragElements = document.querySelectorAll(".drag");
            for (var i = 0; i < allDragElements.length; i++) {
                if (allDragElements[i] === targetELement) {
                    targetELement.style.zIndex = 1000;
                } else {
                    if (allDragElements[i].style.zIndex - 10 > 0) {
                        allDragElements[i].style.zIndex -= 10;
                    } else {
                        allDragElements[i].style.zIndex = 0;
                    }
                }
            }
        };
        function onMouseUp(e) {
           if (targetELement) { //Behöver endast göras om användaren faktiskt har tryckt på en "dragable" div
                document.removeEventListener("mousemove", resizeWindow, false);
                document.removeEventListener("mousemove", moveWindow, false);
                targetELement = null
                isResizing = false;

                objectX = 0;
                objectY = 0;
           }
        };

        function moveWindow(e) {
            //if (3 > (e.pageX - mouseStartX) || 3 >(e.pageY - mouseStartY)) { return;} //Vänta tills änvändaren har rört musen mer än 3 pixlar
            var nextXPos = objectX + e.pageX - mouseStartX;

            //Xleds kontroll
            if (targetELement.offsetWidth + nextXPos < PWD.width) {
                if (nextXPos < 0) {
                    targetELement.style.left = '0px';
                } else {
                    targetELement.style.left = nextXPos + 'px';
                }
            } else {
                targetELement.style.left = PWD.width - targetELement.offsetWidth + 'px';
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
        };

        function resizeWindow(e) {
            if (isResizing) {
                var nextXSize = objectX + e.pageX - mouseStartX;
                console.log(PWD.width);
                if (e.pageX < PWD.width) {
                    targetELement.style.width = nextXSize + 'px';
                } else {
                    targetELement.style.width = objectX + PWD.width - mouseStartX + 'px'; 
                }
                var nextYSize = objectY + e.pageY - mouseStartY;
                var conatiner = targetELement.querySelector(".container");
                if (e.pageY < PWD.height) {
                    conatiner.style.maxHeight = nextYSize + 'px';
                } else {
                    conatiner.style.maxHeight = PWD.height - + (targetELement.style.top.replace(/[^0-9\-]/g, '')) + 'px';
                }
                
                
            }
        }; 
    },
};
window.onload = function () {
    PWD.init();
};

////http://stackoverflow.com/questions/332422/how-do-i-get-the-name-of-an-objects-type-in-javascript
////Vet inte om jag ska använda denna än
//Object.prototype.getName = function () {
//    var funcNameRegex = /function (.{1,})\(/;
//    var results = (funcNameRegex).exec((this).constructor.toString());
//    return (results && results.length > 1) ? results[1] : "";
//};

//Kan ju använda toString
//window.oncontextmenu = function (e) { //Högerklick 
//    console.log(e);
//    console.log(e.target);
//    return false;     // cancel default menu
//};

var CookieUtil = {

    get: function (name) {
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null,
            cookieEnd;

        if (cookieStart > -1) {
            cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }

        return cookieValue;
    },

    set: function (name, value, expires, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }

        if (path) {
            cookieText += "; path=" + path;
        }

        if (domain) {
            cookieText += "; domain=" + domain;
        }

        if (secure) {
            cookieText += "; secure";
        }

        document.cookie = cookieText;
    },

    unset: function (name, path, domain, secure) {
        this.set(name, "", new Date(0), path, domain, secure);
    }
};
