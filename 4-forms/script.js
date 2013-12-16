"use strict";
window.onload = function(){
    var firstNameError = "";
    var lastNameError = "";
    var postNrError = "";
    var mailError = "";

    var ck_name = /^[A-Za-z0-9 ]{3,20}$/;
    var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    var ck_username = /^[A-Za-z0-9_]{1,20}$/;
    var regXPostNumber = /.[0-9]{5,8}/;

function checkFieldIsEmpty() {
    var fld = this;
    var illegalChars = /\W/; // allow letters, numbers, and underscores
    var error = "";
    if (fld.value == "") {
        error = "You didn't enter a username.\n";
    } else if ((fld.value.length < 5) || (fld.value.length > 15)) {//Längd
        error = "The username is the wrong length.\n";
    } else if (illegalChars.test(fld.value)) {
        error = "The username contains illegal characters.\n";
    }
    console.log(error);
    fld.setCustomValidity(error); //Detta sker endast när man försöker posta 
}

function validateNumbers() {
    var fld = this; 
    var error = "";
    var stripped = fld.value.replace(/[\(\)\.\-\ ]/g, '');

    if (fld.value == "") {
        error = "You didn't enter a phone number.\n";
    } else if (isNaN(parseInt(stripped))) {
        error = "The phone number contains illegal characters.\n";
    } else if (regXPostNumber.test(fld.value)) {
        error = "Det är inte minst 5 - 8";
    }
    console.log(error);
    fld.setCustomValidity(error);
}

var inputNotEmpty = document.getElementsByClassName("notEmpty");

for (var i = 0; i < inputNotEmpty.length; i++) {
    inputNotEmpty[i].onblur = checkFieldIsEmpty;
}

var inputOnlyNumbers = document.getElementsByClassName("onlyNumbers");

for (var i = 0; i < inputOnlyNumbers.length; i++) {
    inputOnlyNumbers[i].onblur = validateNumbers;
}

var str = "114"

console.log(regXPostNumber.test(str));

var form = document.getElementById("myform");

form.onsubmit = function (e) {
    console.log(e);
    e.preventDefault();
        var ok = false; 
        //Gör validering här
        if (!ok) { return false; }
}
};