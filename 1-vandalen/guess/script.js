"use strict";

window.onload = function(){
	
	var secretNumber = Math.floor(Math.random()*100+ 1);
	var numberOfGuesses = 0;
	
	// I denna funktion ska du skriva koden f�r att hantera "spelet"
	var guess = function (number) {

		if(isNaN(number)|| number == "") //&& (number < 101 && number > 0))	
		{
		    throw new Error("Det �r inte ett nummer");
		}
		number = +number; //Omvandling

		numberOfGuesses +=1; //Det genomf�rs en gissning
		console.log("Det hemliga talet: " + secretNumber);	
		
		if(number < 0 || number > 100)
		{
			return [false, "Det gissade talet �r inte mellan 0 och 100"];
		}
		
		if(secretNumber === number)
		{
			return [true, "Du gissade r�tt p� " + numberOfGuesses + " f�rs�ket"];
		}
		
		if(secretNumber > number)
		{
			return [false, "Det hemliga talet �r h�gre"];
		}
		
		if(secretNumber < number)
		{
			return [false, "Det hemliga talet �r l�gre"];
		}
	};
	
	// ------------------------------------------------------------------------------
	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#number");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formul�rets skickaknapp som k�r en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formul�ret fr�n att skickas till servern. Vi hanterar allt p� klienten.

		var answer = guess(input.value) // Läser in talet fr�n textrutan och skickar till funktionen "guess"
		
		p.innerHTML = answer[1];		// Skriver ut texten fr�n arrayen som skapats i funktionen.	

		if(answer[0] === true){				// Om spelet �r slut, avaktivera knappen.
			submit.disabled = true;
		}
	
	});
};
