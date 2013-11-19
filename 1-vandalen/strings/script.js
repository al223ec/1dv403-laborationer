"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
		// Plats för förändring.		
		// Returnera den konverterade strängen.
		// Vid fel, kasta ett undantag med ett meddelande till användaren. 
		
		if(!str)
		{
			throw new Error("Var god kontrollera input");
		}

		str = str.replace(/A/gi, "#");

	    //str[i].match(/([A-Z])|[^\x00-\x80]/)){
	    //It matches any character which is not contained in the ASCII character set (0-128, i.e. 0x0 to 0x80). You can do the same thing with Unicode:
	    //[^\u0000-\u0080]+

		for (var i = 0; i < str.length; i++) {
            if (str[i].match(/([A-Z])|[^\x00-\x80]/)) {
		        str = str.replace(str[i], str[i].toLowerCase());
		    } else {
		        str = str.replace(str[i], str[i].toUpperCase());
		    }
		}

		return str;

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