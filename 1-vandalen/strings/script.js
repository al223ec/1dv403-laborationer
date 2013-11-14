"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
		// Plats för förändring.		
		// Returnera den konverterade strängen.
		// Vid fel, kasta ett undantag med ett meddelande till användaren. 
		
		if(!(typeof str == 'string')|| str === null || str === "")
		{
			throw new Error("Var god kontrollera input");
		}

		str = str.replace(/A/gi, "#");
		
		var upperCases = str.match(/([A-Z]+)/g);

		if(!(upperCases === null || upperCases === ""))//Kontrollerar ifall det alls finns n�gon upperCase bokstav
		{
			for (var i = 0; i < upperCases.length; i++) {
				for (var j = 0; j < upperCases[i].length; j++) {
					str = str.replace(upperCases[i][j], "*");
				}
			}
			str = str.toUpperCase();
			for (var i = 0; i < upperCases.length; i++) {
				for (var j = 0; j < upperCases[i].length; j++) {
					str = str.replace("*", upperCases[i][j].toLowerCase());
				}
			}
			return str;
		}		
		else {
			return str.toUpperCase();
		}
	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};