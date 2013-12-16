"use strict";
console.log("test"); 
var container = document.querySelectorAll(".flip-container");

for (var i = 0; i < container.length; i += 1) {
    container[i].onmousedown = function () {
        this.classList.toggle('flip');
    };
}
