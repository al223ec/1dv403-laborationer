"use strict";


var brickContainer = document.createElement("div");
var brickFlipper = document.createElement("div");
var front = document.createElement("div");
var back = document.createElement("div");

brickContainer.className = "flip-container";
brickFlipper.className = "flipper";
front.className = "front";
back.className = "back";

brickFlipper.appendChild(front);
brickFlipper.appendChild(back);
brickContainer.appendChild(brickFlipper);

document.querySelector("#contentHolder").appendChild(brickContainer);
var container = document.querySelectorAll(".flip-container");

for (var i = 0; i < container.length; i += 1) {
    container[i].onmousedown = function () {
        this.classList.toggle('flip');
    };
}
