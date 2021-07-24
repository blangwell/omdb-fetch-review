'use strict';
var searchForm = document.querySelector(".search-form");
var searchInput = document.querySelector(".search-form__input");
var resultContainer = document.querySelector(".result-container");

searchForm.addEventListener("submit", function(event) {
	event.preventDefault();
	searchOMDB();
});

function searchOMDB() {
	clearResultContainer();
	fetch("http://www.omdbapi.com/?apikey=******&s=" + searchInput.value)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) 	{
			console.log(data);
			var movieList = data.Search;
			var titleElement;
			var posterElement;
			var yearElement;
			var detailsButton;
			for (var i = 0; i < movieList.length; i++) {
				titleElement = document.createElement("h3");
				titleElement.innerText = movieList[i].Title;
				
				posterElement = document.createElement("img");
				if (movieList[i].Poster.toLowerCase() === "n/a") {
					posterElement.src = "./img/moviePosterTemplate.jpeg"
					posterElement.style.width = "300px";
					posterElement.style.height = "auto";
				} else {
					posterElement.src = movieList[i].Poster;
				}

				yearElement = document.createElement("p");
				yearElement.innerText = movieList[i].Year;

				detailsButton = document.createElement("button");
				detailsButton.innerText = "Show Details";
				detailsButton.addEventListener("click", function() {
					getMovieDetails(movieList[i].imdbID);
				});

				resultContainer.appendChild(titleElement);
				resultContainer.appendChild(posterElement);
				resultContainer.appendChild(yearElement);
				resultContainer.appendChild(detailsButton);
			}
		});
}

function getMovieDetails(imdbID) {
	clearResultContainer();
	fetch("http://www.omdbapi.com/?apikey=******&i=" + imdbID)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			console.log(data);
			var titleElement = document.createElement("h3");
			titleElement.innerText = data.Title;

			var posterElement = document.createElement("img");
			if (data.Poster.toLowerCase() === "n/a") {
				posterElement.src = "./img/moviePosterTemplate.jpeg";
			} else {
				posterElement.src = data.Poster;
			}
			posterElement.style.width = "300px";
			posterElement.style.height = "auto";

			var castElement = document.createElement("p");
			castElement.innerText = "Cast: \n" + data.Actors;

			var plotElement = document.createElement("p");
			plotElement.innerText = data.Plot;

			resultContainer.appendChild(titleElement);
			resultContainer.appendChild(posterElement);
			resultContainer.appendChild(castElement);
			resultContainer.appendChild(plotElement);
		})
		.catch(function(error) {
			throw error;
		})
}

function createMovieElements (data) {
	var elementsToAppend = [];

	var titleElement = document.createElement("h3");
	titleElement.innerText = data.Title;	
	elementsToAppend.push(titleElement);

	var posterElement = document.createElement("img");
	if (data.Poster.toLowerCase() === "n/a") {
		posterElement.src = "./img/moviePosterTemplate.jpeg";
	} else {
		posterElement.src = data.Poster;
	}
	posterElement.style.width = "300px";
	posterElement.style.height = "auto";
	elementsToAppend.push(posterElement);

	var yearElement = document.createElement("p");
	yearElement.innerText = data.Year;
	elementsToAppend.push(yearElement);

	if (data.Plot) {
		var plotElement = document.createElement("p");
		plotElement.innerText = data.Plot;
		elementsToAppend.push(plotElement);
	}

	if (data.Actors) {
		var actorsElement = document.createElement("p");
		actorsElement.innerText = "Cast:\n" + data.Actors;
		elementsToAppend.push(actorsElement);
	}

	for (var i = 0; i < elementsToAppend.length; i++) {
		resultContainer.appendChild(elementsToAppend[i]);
	}
}

function clearResultContainer() {
	while (resultContainer.firstChild) {
		resultContainer.removeChild(resultContainer.firstChild);
	}
}