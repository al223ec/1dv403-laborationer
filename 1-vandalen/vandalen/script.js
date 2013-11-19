"use strict";

var makePerson = function (persArr) {

    if (persArr === null || persArr === 'undefiened') {
        throw new Error("Felaktigt argument");
    }
    //http://stackoverflow.com/questions/135448/how-do-i-check-to-see-if-an-object-has-a-property-in-javascript

    function hasProperty(obj, prop) {
        var proto = obj.__proto__ || obj.constructor.prototype; // __proto__  references the same object as its internal [[Prototype]] (often referred to as "the prototype"), dvs kollar om propertien finns i prototypen
        return (prop in obj) && (!(prop in proto) || proto[prop] !== obj[prop]); //The in operator returns true if the specified property is in the specified object.
        //return prop in obj; 
    }

    for(var i = 0; i < persArr.length; i++){
        if (!hasProperty(persArr[i], "name")) { throw new Error("Inte ett korekt objekt, saknas name property"); }
        if (!hasProperty(persArr[i], "age")) { throw new Error("Inte ett korekt objekt, saknas age property"); }
    }

 	var minAge = persArr[0].age;
	var maxAge = persArr[0].age;
	var averageAge = 0;
	var namesArr = []; 
	var names;

	for (var i = 0; i < persArr.length; i ++){
		minAge = (persArr[i].age < minAge)? persArr[i].age : minAge;
		maxAge = (persArr[i].age > minAge)? persArr[i].age : maxAge;
		averageAge += persArr[i].age; 
		namesArr[i] = persArr[i].name;
	}

	averageAge = Math.round(averageAge / persArr.length);
    //array.splice(1, 1);
    //var arr = [65,45,43,42];
	//var sum = 0; 
	
	//arr.forEach(function(i){
	//	console.log(i); 
	//});
	
	//sum = arr.sort(function(a,b){
	//	return a > b; 
	//});
	//console.log(namesArr);
	namesArr.sort();

	for (var j = 0; j < namesArr.length; j++) {
	    if (j === 0 && namesArr.length > 1) {
	        names = namesArr[j] + ", ";
	    } else if ((namesArr.length - 1) > j) {
	        names += namesArr[j] + ", ";
	    } else {
	        names += namesArr[j];
	    }
	}

   
	return { "averageAge": averageAge, "maxAge": maxAge, "minAge": minAge, "names": names };
};

var data = [{ name: "John Häggerud", age: 37 }, { name: "Johan Leitet", age: 36 }, { name: "Mats Loock", age: 46 }];
makePerson(data);
data = [{ name: "John Häggerud", age: 37 }, { name: "Johan Leitet", age: 36 }, { name: "Mats Loock", age: 46 }];
makePerson(data);