const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-form__input");
const resultContainer = document.querySelector(".result-container");

searchForm.addEventListener("submit", event => {
	event.preventDefault();
	searchOMDB();
});

async function searchOMDB() {
	clearResultContainer();
	let response = await fetch(`http://www.omdbapi.com/?apikey=******&s=${searchInput.value}`)
	let data = await response.json();
	let movieList = data.Search;
	movieList.forEach(movie => {
		createMovieElements(movie, true);
	});
}

async function getMovieDetails(imdbID) {
	clearResultContainer();
	let response = await fetch(`http://www.omdbapi.com/?apikey=******&i=${imdbID}`);
	let data = await response.json();
	createMovieElements(data, false);
}

function createMovieElements (data, showDetailsButton) {
	let elementsToAppend = [];

	let bsCard = document.createElement("div");
	bsCard.classList = "animate__animated animate__fadeInUp card";
	bsCard.style.width = "18rem";

	let posterElement = document.createElement("img");
	if (data.Poster.toLowerCase() === "n/a") {
		posterElement.src = "./img/moviePosterTemplate.jpeg";
	} else {
		posterElement.src = data.Poster;
	}
	posterElement.classList = "card-img-top movie-details__poster";
	bsCard.appendChild(posterElement);

	let bsCardBody = document.createElement("div");
	bsCardBody.classList = "card-body";

	let titleElement = document.createElement("h3");
	titleElement.innerText = data.Title;	
	titleElement.classList = "movie-details__title"
	elementsToAppend.push(titleElement);

	let yearElement = document.createElement("p");
	yearElement.innerText = data.Year;
	elementsToAppend.push(yearElement);

	if (data.Actors) {
		let actorsElement = document.createElement("p");
		actorsElement.innerText = "Cast: " + data.Actors;
		elementsToAppend.push(actorsElement);
	}

	if (data.Plot) {
		let plotElement = document.createElement("p");
		plotElement.innerText = data.Plot;
		elementsToAppend.push(plotElement);
	}

	if (showDetailsButton) {
		let detailsButton = document.createElement("button");
		detailsButton.innerText = "Show Details";
		detailsButton.addEventListener("click", () => {
			getMovieDetails(data.imdbID);
		});
		elementsToAppend.push(detailsButton);
	}

	elementsToAppend.forEach(element => {
		bsCardBody.appendChild(element);
	});

	bsCard.appendChild(bsCardBody);
	resultContainer.append(bsCard);
}

function clearResultContainer() {
	while (resultContainer.firstChild) {
		resultContainer.removeChild(resultContainer.firstChild);
	}
}