"use strict";

var makePerson = function (persArr) {
    if (persArr === null || persArr === 'undefiened') {
        throw new Error("Felaktigt argument");
    }
    //http://stackoverflow.com/questions/135448/how-do-i-check-to-see-if-an-object-has-a-property-in-javascript

    function hasProperty(obj, prop) {
        //var proto = obj.__proto__ || obj.constructor.prototype; // __proto__  references the same object as its internal [[Prototype]] (often referred to as "the prototype"), dvs kollar om propertien finns i prototypen
        return (prop in obj);// && (!(prop in proto) || proto[prop] !== obj[prop]); //The in operator returns true if the specified property is in the specified object.
        //return prop in obj; 
    }
    for(var i = 0; i < persArr.length; i++){
        if (!hasProperty(persArr[i], "name")) { throw new Error("Inte ett korekt objekt, saknas name property"); }
        if (typeof persArr[i].name !== "string") { throw new Error("Name innehåller inte en string"); }
        if (!hasProperty(persArr[i], "age")) { throw new Error("Inte ett korekt objekt, saknas age property"); }
        if (isNaN(persArr[i].age)) { throw new Error("Age innehåller inte ett number"); }
    }
    /*
    Returns a number indicating whether a reference string comes before or after or is the same as the given string in sort order. 
    The new locales and options arguments let applications specify the language whose sort order should be used and customize the 
    behavior of the function. In older implementations, which ignore the locales and options arguments, the locale and sort order 
    used are entirely implementation dependent.
    */

    var names = persArr.map(function (arg) { return arg.name; }).sort(function (a, b) { return a.localeCompare(b); }).join(', '); //locale är inclusive åäö mao lokala språkinställingar
    var ageArr = persArr.map(function (arg) { return +arg.age; });
    var maxAge = Math.max.apply(Math, ageArr);
    var minAge = Math.min.apply(Math, ageArr);

    var averageAge = Math.round(ageArr.reduce(function (a, b) { return a += +b; }) / persArr.length);

	return { "averageAge": averageAge, "maxAge": maxAge, "minAge": minAge, "names": names };
};

var data = [{ name: "John Häggerud", age: 37 }, { name: "Johan Leitet", age: 36 }, { name: "Mats Loock", age: 46 }];
makePerson(data);
