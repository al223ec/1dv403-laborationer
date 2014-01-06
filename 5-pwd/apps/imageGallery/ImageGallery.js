"use strict";
function ImageGallery() {
    var galleryContainer = document.createElement("div");
    var footer = null; 
    var images = null;
    var that = this;
    var openImages; 

    this.init = function () {
        galleryContainer.className = "container";
        return galleryContainer;
    };

    this.loadFile = function () {
        var startTime = new Date();
        var timeout = setTimeout(displayFooter, 200); 
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            try {
                if (xhr.readyState == 4) { //redy state 4 == Complete  3 == recieveing This kan inte användas i detta fall pga Browser kompatibilitet
                    clearTimeout(timeout);
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {//lyckat
                        images = JSON.parse(xhr.responseText);
                        loadImages();
                        while (footer.firstChild) {
                            footer.removeChild(footer.firstChild);
                        }
                        footer.appendChild(document.createTextNode("Detta tog: " + (new Date().getTime() - startTime.getTime()) + "ms"));
                    } else {//misslyckades
                        throw Error(xhr.status);
                    }
                }
            } catch (ex) {
                console.log(ex);
            }
        };

        xhr.open("get", 'http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/', true);
        xhr.send(null);
    };

    this.setFooter = function (foot) { footer = foot;  };

    function displayFooter() {
        if (!footer) { throw Error("Fail, footer finns inte"); }
        var img = document.createElement("img");
        img.src = 'img/loader.gif'; 
        footer.appendChild(img);
        footer.appendChild(document.createTextNode("Laddar..."));
    };

    this.addWindow = function (img) {
        if (!openImages) { openImages = [] }; 
        openImages.push(img);
    };

    function loadImages() {
        if (!images) {
            throw Error("Fail images är inte definerat");
        }
        var thumbWidth = 0;
        var thumbHeight = 0;
        
        for (var i = 0; i < images.length; i++) {
            galleryContainer.appendChild(new Image(images[i], that).initThumb());
            if (images[i].thumbWidth > thumbWidth) {
                thumbWidth = images[i].thumbWidth;
            }
            if (images[i].thumbHeight > thumbHeight) {
                thumbHeight = images[i].tumbHeight;
            }
        }
        thumbWidth += 40;
        thumbHeight += 40;

        //console.log(document.styleSheets[0]);
    //    document.styleSheets[0].cssRules[0].cssText = "\
    // #myID {
    //    myRule: myValue;
    //    myOtherRule: myOtherValue;
    //}";
        //Bör finnas en bättre lösning
        var allImgs = document.querySelectorAll(".galleryDiv");
        for (var i = 0; i < allImgs.length; i++) {
            allImgs[i].style.width = thumbWidth + 'px';
            allImgs[i].style.height = thumbHeight + 'px';
        }
    };
};
ImageGallery.prototype.toString = function () {
    return "ImageGallery";
};
function Image(imageObj, imageGallery) {
    var div = document.createElement("div");
    div.className = "galleryDiv";
    var a = document.createElement("a");
    var thumbImage = document.createElement("img");
    var largeImage = document.createElement("img");
    largeImage.src = imageObj.URL;

    var that = this;

    a.onclick = function () {
        WindowHandler.addImageWindow(imageGallery, that);
    };

    a.oncontextmenu = rightClick;
    //largeImage.oncontextmenu = rightClick;

    this.initThumb = function () {
        thumbImage.src = imageObj.thumbURL;
        a.href = '#';
        a.appendChild(thumbImage);
        div.appendChild(a);
        return div; 
    };

    this.init = function () {
        var clone = largeImage.cloneNode();
        clone.oncontextmenu = rightClick;
        return clone;
    };

    function rightClick(e) {
        DisplayMeny.init(getMenyItems(), e);
    };

    function getMenyItems() {
        var list = []; 
        var setAsBackground = document.createElement("a");
        setAsBackground.appendChild(document.createTextNode("Sätt som bakgrund"));
        setAsBackground.href = "#";

        setAsBackground.onclick = function () {
            document.querySelector("body").style.backgroundImage = "url("+largeImage.src+")";
        }; 

        list.push(setAsBackground);
        return list;
    }; 
}; 