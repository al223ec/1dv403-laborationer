"use strict";

var makePerson = function (persArr) {

    if (persArr === null || persArr === 'undefiened') {
        throw new Error("Felaktigt argument");
    }

	var minAge = persArr[0].age;
	var maxAge = persArr[0].age;
	var averageAge = 0;
	var namesArr = []; 
	var names;

	for(var i in persArr){
		minAge = (persArr[i].age < minAge)? persArr[i].age : minAge;
		maxAge = (persArr[i].age > minAge)? persArr[i].age : maxAge;
		averageAge += persArr[i].age; 
		namesArr[i] = persArr[i].name;
	}

	averageAge = Math.round( averageAge/persArr.length); 
	//console.log(minAge);
	//console.log(maxAge);
	//console.log(averageAge);

	console.log(namesArr);
	console.log(namesArr.length);
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
	    if (j === 0) {
	        names = namesArr[j] + ", ";
	    } else if ((namesArr.length - 1) > j) {
	        names += namesArr[j] + ", ";
	    } else {
	        names += namesArr[j];
	    }
	}
	
	console.log(names);
   
	return {"averageAge" : averageAge, "maxAge" : maxAge, "minAge" : minAge, "names" : names} 
};

var data = [{name: "John Häggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];
makePerson(data);