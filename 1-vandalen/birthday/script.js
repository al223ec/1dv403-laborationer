"use strict";

window.onload = function(){
	var birthday = function(date){
			var birthday = new Date(date);
			if(isNaN(birthday))
			{
				throw new Error("Vg kontrollera input, datumet �r inte i korekt format");
			}
			birthday.setFullYear(2013);
			var todaysDate = new Date();

			birthday.setHours(todaysDate.getHours());
			todaysDate = todaysDate.getTime();

			var numOfDaysToBirthday = Math.round((birthday.getTime() - todaysDate)/1000/60/60/24);

			if(numOfDaysToBirthday < 0){
				return 365 + numOfDaysToBirthday;
			}

			return numOfDaysToBirthday; 
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
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};