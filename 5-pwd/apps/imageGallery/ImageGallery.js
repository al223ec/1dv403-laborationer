"use strict";
function ImageGallery() {
    App.call(this);
    var galleryContainer = this.container;
    var footer = this.footer; 
    var that = this;

    this.start = function () {
        this.init("Image gallery");
        galleryContainer.className = "container";
        that.readFromServer('http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/', loadImages, footer);

        initDropDown(this.addDropDown("Meny", true));
        return this.getDragDiv();
    };

    function loadImages(xhr) {
        var images = JSON.parse(xhr.responseText);
        if (!images) {
            throw Error("Fail images �r inte definerat");
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

        var allImgs = document.querySelectorAll(".galleryDiv");
        for (var i = 0; i < allImgs.length; i++) {
            allImgs[i].style.width = thumbWidth + 'px';
            allImgs[i].style.height = thumbHeight + 'px';
        }
    };
    function initDropDown(div) {};
};
ImageGallery.prototype.toString = function () {
    return "ImageGallery";
};
ImageGallery.prototype = Object.create(App.prototype);
ImageGallery.prototype.readFromServer = RssReader.prototype.readFromServer;

function ImageWindow(img) {
    App.call(this);
    var container = this.container;
    var that = this;

    this.start = function () {
        this.init("Imageview");
        container.appendChild(img);
        initDropDown(this.addDropDown("Alternativ", true));
        return this.getDragDiv();
    };
    function initDropDown(div) {
        var a = document.createElement("a")
        a.href = "#";
        a.onclick = function () {
            document.querySelector("body").style.backgroundImage = "url(" + img.src + ")";
        };

        a.appendChild(document.createTextNode("S�tt som bakgrund"));
        div.appendChild(a);
    };

};
ImageWindow.prototype = Object.create(App.prototype);

function Image(imageObj, imageGallery) {
    var div = document.createElement("div");
    div.className = "galleryDiv";
    var a = document.createElement("a");
    var thumbImage = document.createElement("img");
    var largeImage = document.createElement("img");
    largeImage.src = imageObj.URL;

    var that = this;

    a.onclick = function () {
        var newLargeImage = largeImage.cloneNode();
        newLargeImage.oncontextmenu = rightClick;
        var newImg = new ImageWindow(newLargeImage);
        PWD.add(newImg.start());
    };

    a.oncontextmenu = rightClick;

    this.initThumb = function () {
        thumbImage.src = imageObj.thumbURL;
        a.href = '#';
        a.appendChild(thumbImage);
        div.appendChild(a);
        return div; 
    };

    function rightClick(e) {
        that.displayMenu.init(getMenyItems(), e);
    };

    function getMenyItems() {
        var list = []; 
        var setAsBackground = document.createElement("a");
        setAsBackground.appendChild(document.createTextNode("S�tt som bakgrund"));
        setAsBackground.href = "#";

        setAsBackground.onclick = function () {
            document.querySelector("body").style.backgroundImage = "url("+largeImage.src+")";
        }; 

        list.push(setAsBackground);
        return list;
    }; 
};
Image.prototype.displayMenu = App.prototype.DisplayMeny;