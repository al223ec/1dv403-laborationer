"use strict";

window.onload = function(){
	
	var secretNumber = Math.floor(Math.random()*100+ 1);
	var numberOfGuesses = 0;
	
	// I denna funktion ska du skriva koden för att hantera "spelet"
	var guess = function (number) {

		if(isNaN(number)|| number == "") //&& (number < 101 && number > 0))	
		{
		    throw new Error("Det är inte ett nummer");
		}
		number = +number; //Omvandling

		numberOfGuesses +=1; //Det genomförs en gissning
		console.log("Det hemliga talet: " + secretNumber);	
		
		if(number < 0 || number > 100)
		{
			return [false, "Det gissade talet är inte mellan 0 och 100"];
		}
		
		if(secretNumber === number)
		{
			return [true, "Du gissade rätt på " + numberOfGuesses + " försöket"];
		}
		
		if(secretNumber > number)
		{
			return [false, "Det hemliga talet är högre"];
		}
		
		if(secretNumber < number)
		{
			return [false, "Det hemliga talet är lägre"];
		}
	};
	
	// ------------------------------------------------------------------------------
	// Kod fÃ¶r att hantera utskrift och inmatning. Denna ska du inte behÃ¶va fÃ¶rÃ¤ndra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#number");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		var answer = guess(input.value) // LÃ¤ser in talet från textrutan och skickar till funktionen "guess"
		
		p.innerHTML = answer[1];		// Skriver ut texten från arrayen som skapats i funktionen.	

		if(answer[0] === true){				// Om spelet är slut, avaktivera knappen.
			submit.disabled = true;
		}
	
	});
};
