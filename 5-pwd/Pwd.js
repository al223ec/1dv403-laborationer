"use strict";
var PWD = {//statiska objektet som startar applikationen
    //Denna klass ska sköta hanteringen av vilka applikationer som ska startas.
    main: document.querySelector("main"),
    width: 1920,
    height: 946,
    numOfWindows: 0,
    dragDropObj: null,
    useCookie: false,

    init: function () {
        document.onselectstart = function () { return false; }
        //intiera alla objekt här
        this.dragDropObj = new this.dragDrop();
        this.dragDropObj.init();
        var that = this;
        PWD.AppHandler.init();

        var imageGallery = document.querySelector("#appImage");
        imageGallery.onclick = function () {
            that.start(new PWD.App.ImageGallery());
        };
        imageGallery.addEventListener('contextmenu', function (e) {
            PWD.AppHandler.displayMenu(e, PWD.App.ImageGallery.prototype.toString());
        });

        var memory = document.querySelector("#appMemory");
        memory.onclick = function () {
            that.start(new PWD.App.MemoryGame());
        };
        memory.addEventListener('contextmenu', function (e) {
            PWD.AppHandler.displayMenu(e, PWD.App.MemoryGame.prototype.toString());
        });

        var messBoard = document.querySelector("#appMessage");
        messBoard.onclick = function () {
            that.start(new PWD.App.MessageBoard());
        };
        messBoard.addEventListener('contextmenu', function (e) {
            PWD.AppHandler.displayMenu(e, PWD.App.MessageBoard.prototype.toString());
        });

        var reader = document.querySelector("#appRssReader");
        reader.onclick = function () {
            that.start(new PWD.App.RssReader());
        };
        reader.addEventListener('contextmenu', function (e) {
            PWD.AppHandler.displayMenu(e, PWD.App.RssReader.prototype.toString());
        });

        var chat = document.querySelector("#appChat");
        chat.onclick = function () {
            that.start(new PWD.App.ChatBoard());
        };
        chat.addEventListener('contextmenu', function (e) {
            PWD.AppHandler.displayMenu(e, PWD.App.ChatBoard.prototype.toString());
        }); 

        var paint = document.querySelector("#appPaint");
        paint.onclick = function () {
            that.start(new PWD.App.Paint());
        };
        paint.addEventListener('contextmenu', function (e) {
            PWD.AppHandler.displayMenu(e, PWD.App.Paint.prototype.toString());
        });
        PWD.App.Clock.start();
    },

    start: function (app) {
        var that = this;
        that.add(app.start());
        that.numOfWindows++;
        PWD.AppHandler.add(app);
    },

    add: function (div) {
        this.main.appendChild(div);
        this.fixBounds();
    },

    removeWindow: function (div, app) {
        this.main.removeChild(div);
        if (app) {
            PWD.AppHandler.removeApp(app);
        }
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
        var isResizing = false;

        var maxWidth = 0; //Distansen mellan fönstretshörn x och PWD.width; 
        var maxHeight = 0;
        var that = this; 

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
                that.setFocus();

                objectX = targetELement.offsetWidth;
                objectY = targetELement.querySelector(".container").offsetHeight; //Måste påverka container i y led annars kukar det ur

                maxWidth = PWD.width - targetELement.offsetLeft;
                maxHeight = PWD.height - targetELement.offsetTop;

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
            that.setFocus();

            objectX = targetELement.offsetLeft;//+(targetELement.style.left.replace(/[^0-9\-]/g, '')); //Måste ta bort px, annars blir resultatet NaN +omvandling
            objectY = targetELement.offsetTop;//+(targetELement.style.top.replace(/[^0-9\-]/g, ''));

            mouseStartX = e.pageX;
            mouseStartY = e.pageY;

            document.addEventListener("mousemove", moveWindow, false); //Gör detta om anändare klckar på något dragbart

            //Fixa browsersupport här, så inte text markeras etc
            return false;
        };

        this.setFocus = function (element, obj) {
            var target = targetELement; 
            if (element) {
                target = element; 
            }

            var allDragElements = document.querySelectorAll(".drag");
            for (var i = 0; i < allDragElements.length; i++) {
                if (allDragElements[i] === target) {
                    target.style.zIndex = 1010;
                } else {
                    if (allDragElements[i].style.zIndex - 10 > 0) {
                        allDragElements[i].style.zIndex -= 10;
                    } else {
                        allDragElements[i].style.zIndex = 0;
                    }
                }
            }

            if (obj && obj.restore && obj.isMinimized) {
                obj.restore();
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
                var container = targetELement.querySelector(".container");
                var footer = targetELement.querySelector("footer");
                if (!container || !footer) {
                    return;
                }

                var nextXSize = objectX + e.pageX - mouseStartX;
                if (nextXSize < maxWidth - 3) {//3 scrollbaren
                    targetELement.style.width = nextXSize + 'px';
                } else {
                    targetELement.style.width = maxWidth -3 + 'px'; 
                }

                var nextYSize = objectY + e.pageY - mouseStartY;
                if (nextYSize < maxHeight - container.offsetTop - footer.offsetHeight - 2) {
                    container.style.height = nextYSize + 'px';
                } else {
                    container.style.height = maxHeight - container.offsetTop - footer.offsetHeight - 2 + 'px';
                }
            }
        }; 
    },
};
window.onload = function () {
    PWD.init();
};

    //PWD.Settings.CookieUtil.set("namn", "Anto sn"); //Detta funkar inte i chrome!!
    //console.log(PWD.Settings.CookieUtil.get("namn"));


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
