"use strict";
window.onload = function () {
    var valid = new Validator(document.getElementById("myform"));
    valid.init();
};

function Validator(form) {
    if (!form) { var form = document.getElementById("myform"); }

    var notEmptyFields = document.querySelectorAll("input.notEmpty");
    var emailField = document.getElementById("mail");
    var postKodField = document.getElementById("postal");
    var selectElement = document.querySelector("select"); 
    var formIsConfirmed = false;
    var that = this; 

    this.init = function () {
        for (var i = 0; i < notEmptyFields.length; i++) {
            notEmptyFields[i].onblur = checkFieldIsEmpty;
        }
        postKodField.onblur = checkPostKod;
        emailField.onblur = checkEmail;

        form.onsubmit = function (e) {
            console.log(selectElement.value);
            if (!formIsConfirmed) {
                e.preventDefault();
            }
            for (var i = 0; i < notEmptyFields.length; i++) {
                notEmptyFields[i].required = true;
                if (!notEmptyFields[i].checkValidity()) {
                    notEmptyFields[i].setCustomValidity("Vg kontrollera detta fält");
                    displayError(notEmptyFields[i], "Vg kontrollera detta fält");
                }
            }

            postKodField.required = true;
            emailField.required = true;

            if (!postKodField.checkValidity()) {
                postKodField.setCustomValidity("Vg kontrollera detta fält");
                displayError(postKodField, "Vg kontrollera detta fält");
            }

            if (!emailField.checkValidity()) {
                emailField.setCustomValidity("Vg kontrollera detta fält");
                displayError(emailField, "Vg kontrollera detta fält");
            }

            if (form.checkValidity()) {
              blurForm(form);
              var data = [["Förnamn: ", notEmptyFields[0].value], ["Efternamn: ", notEmptyFields[1].value], ["Select: ", selectElement.value], ["Postnr: ", postKodField.value], ["Email: ", emailField.value]];
                CreatePupup.init(form, data, that);
            }
        }
    }; 
    
    function checkFieldIsEmpty() {
        var field = this.value.trim();
        field = field.replace(/[^A-ZÅÄÖ]/ig, ''); //Ersätter allt som inte är a-zåäö i -ignore case, g -global
        var error = '';

        if (field === '') {
            error = "Detta fält får inte vara tomt";
        } else if (field.length < 2) {
            error = "Du har ett väldigt kort namn";
        } else if (field.length > 25) {
            error = "Du har ett väldigt kort namn";
        }
        displayError(this, error);
    };

    function checkEmail() {
        var field = this.value.trim();
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var error = '';
        if (!re.test(field)) {
            error = "Detta är inte en giltig emailadress";
        }
        displayError(this, error);
    }; 

    function checkPostKod() {
        var field = this.value.trim();
        field = field.replace(/[^0-9]/ig, '');
        var error = '';

        if (isNaN(parseInt(field))) {
            error = "Detta är inte ett nummer";
        } else if (field.length !== 5) {
            error = "Denna postkod är i felaktig längd, ange postkoden i XXXXX format";
        }
        this.value = field;
        displayError(this, error);
    }; 

    function displayError(that, error) {
        that.setCustomValidity(error); // (error) ? false : true;

        while (that.nextSibling.hasChildNodes()) {
            that.nextSibling.removeChild(that.nextSibling.firstChild);
        }
        that.nextSibling.appendChild(document.createTextNode(error));
    };

    function blurForm() {
        var allFormElments = form.elements;

        for (var i = 0; i < allFormElments.length; i++) {
            allFormElments[i].disabled = true;
        }
        form.style.opacity = '0.5';
    };

    this.resetForm = function() {
        var allFormElments = form.elements;

        for (var i = 0; i < allFormElments.length; i++) {
            allFormElments[i].disabled = false;
        }
        form.style.opacity = '1';
    }

    this.setFormIsConfirmed = function (bool) {
        formIsConfirmed = bool;
    }; 
}

var CreatePupup = {

    init: function (form, data, validator) {
        var main = document.querySelector("main");
        var popupDiv = document.createElement("div");
        var h1 = document.createElement("h1");
        var table = document.createElement("table");

        h1.appendChild(document.createTextNode("Bekräfta dina uppgifter"));
        popupDiv.className = "popup";
        popupDiv.appendChild(h1);
        var that = this; 
        for (var i = 0; i < data.length; i++) {
            table.appendChild(that.createTr(data[i][0], data[i][1]));
        }

        var button = document.createElement("button");
        button.appendChild(document.createTextNode("Bekräfta"));
        button.onclick = function () {
            validator.setFormIsConfirmed(true);
            validator.resetForm();
            form.submit();
        }

        var abort = document.createElement("button");
        abort.appendChild(document.createTextNode("Avbryt"));
        abort.onclick = function () {
            popupDiv.parentNode.removeChild(popupDiv);
            validator.resetForm();
        }
        popupDiv.appendChild(table);
        popupDiv.appendChild(abort);
        popupDiv.appendChild(button);

        main.appendChild(popupDiv);
     
    }, 
    createTr: function (text, value) {
        var tr = document.createElement("tr");
        var tdText = document.createElement("td");
        var tdValue = document.createElement("td");

        tdText.appendChild(document.createTextNode(text));
        tdValue.appendChild(document.createTextNode(value));

        tr.appendChild(tdText);
        tr.appendChild(tdValue);
        return tr; 
    }
}

////EVENTUTIL????????????????+++++++++++++++++++++++++++++
//var EventUtil = {

//    addHandler: function (element, type, handler) {
//        if (element.addEventListener) {
//            element.addEventListener(type, handler, false);
//        } else if (element.attachEvent) {
//            element.attachEvent("on" + type, handler);
//        } else {
//            element["on" + type] = handler;
//        }
//    },
//    removeHandler: function (element, type, handler) {
//        if (element.removeEventListener) {
//            element.removeEventListener(type, handler, false);
//        } else if (element.detachEvent) {
//            element.detachEvent("on" + type, handler);
//        } else {
//            element["on" + type] = null;
//        }
//    },
//    getEvent: function (event) {
//        return event ? event : window.event; 
//    },
//    getTarget: function (event) {
//        return event.target || event.srcElement; 
//    },
//    preventDefault: function (event) {
//        if (event.preventDefault) {
//            event.preventDefault();
//        } else {
//            event.returnValue = false;
//        }
//    },
//    stopPropagation: function (event) {
//        if (event.stopPropagation) {
//            event.stopPropagation();
//        } else {
//            event.cancelBubble = true;
//        }
//    }
//};


//return form.checkValidity(); 
//kod för att undvika flera form submits: 
//EventUtil.addHandler(form, "submit", function (event) {
//    event = EventUtil.getEvent(event);
//    var target = EventUtil.getTarget(event);

//    var btn = target.elements["submitBtn"];
//    btn.disabled = true;
//});
//var firstNameError = "";
//    var lastNameError = "";
//    var postNrError = "";
//    var mailError = "";

//    var ck_name = /^[A-Za-z0-9 ]{3,20}$/;
//    var ck_email = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
//    var ck_username = /^[A-Za-z0-9_]{1,20}$/;
//    var regXPostNumber = /.[0-9]{5,8}/;

//function checkFieldIsEmpty() {
//    var fld = this;
//    var illegalChars = /\W/; // allow letters, numbers, and underscores
//    var error = "";
//    if (fld.value == "") {
//        error = "You didn't enter a username.\n";
//    } else if ((fld.value.length < 5) || (fld.value.length > 15)) {//Längd
//        error = "The username is the wrong length.\n";
//    } else if (illegalChars.test(fld.value)) {
//        error = "The username contains illegal characters.\n";
//    }
//    console.log(error);
//    fld.setCustomValidity(error); //Detta sker endast när man försöker posta 
//}

//function validateNumbers() {
//    var fld = this; 
//    var error = "";
//    var stripped = fld.value.replace(/[\(\)\.\-\ ]/g, '');

//    if (fld.value == "") {
//        error = "You didn't enter a phone number.\n";
//    } else if (isNaN(parseInt(stripped))) {
//        error = "The phone number contains illegal characters.\n";
//    } else if (regXPostNumber.test(fld.value)) {
//        error = "Det är inte minst 5 - 8";
//    }
//    console.log(error);
//    fld.setCustomValidity(error);
//}

//var inputNotEmpty = document.getElementsByClassName("notEmpty");

//for (var i = 0; i < inputNotEmpty.length; i++) {
//    inputNotEmpty[i].onblur = checkFieldIsEmpty;
//}

//var inputOnlyNumbers = document.getElementsByClassName("onlyNumbers");

//for (var i = 0; i < inputOnlyNumbers.length; i++) {
//    inputOnlyNumbers[i].onblur = validateNumbers;
//}

//var str = "114"

//console.log(regXPostNumber.test(str));

//var form = document.getElementById("myform");

//form.onsubmit = function (e) {
//    console.log(e);
//    e.preventDefault();
//        var ok = false; 
//        //Gör validering här
//        if (!ok) { return false; }
//}