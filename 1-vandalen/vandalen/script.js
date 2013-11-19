"use strict";

var makePerson = function(persArr){

	var minAge = persArr[0].age;
	var maxAge = persArr[0].age;
	var averageAge = 0; 
	
	console.log(persArr["name"]);
	for(var i in persArr){
		minAge = (persArr[i].age < minAge)? persArr[i].age : minAge;
		maxAge = (persArr[i].age > minAge)? persArr[i].age : maxAge;
		averageAge += persArr[i].age; 
		
	}

	averageAge = averageAge/persArr.length; 
	console.log(minAge);
	console.log(maxAge);
	console.log(averageAge);
	
	
	var arr = [65,45,43,42];
	var sum = 0; 
	
	arr.forEach(function(i){
		console.log(i); 
	});
	
	sum = arr.sort(function(a,b){
		return a > b; 
	});
	
	console.log(sum);
	// Din kod h√§r...

};

var data = [{name: "John H‰ggerud", age: 37}, {name: "Johan Leitet", age: 36}, {name: "Mats Loock", age: 46}];
makePerson(data);