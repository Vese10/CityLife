const btn = document.querySelector('button');
const div = document.querySelector('div');
const cityName = document.createElement('p');
cityName.classList.add('city');
const citySummary = document.createElement('p');
citySummary.style.border = 'none';
citySummary.style.backgroundColor = 'transparent';
citySummary.classList.add('city-summary');
const cityScore = document.createElement('p');
cityScore.classList.add('city-score');
const cityNotFound = document.createElement('p');
cityNotFound.classList.add('city-not-found');
const cityCategories = document.createElement('ul');
cityCategories.classList.add('city-categories');

div.appendChild(cityName);
div.appendChild(cityScore);
div.appendChild(citySummary);
div.appendChild(cityNotFound);
div.appendChild(cityCategories);

let categoriesHandled = false; // Flag to track whether handleSuccessCategories has been executed

async function handleSuccessInfo(json) {
  cityNotFound.textContent = '';
  citySummary.innerHTML = json.summary;
  citySummary.style.border = '2px solid #000000';
  citySummary.style.backgroundColor = '#ffffff';
  cityScore.innerHTML = `The teleport city score is: <br> ${json.teleport_city_score.toFixed(2)} out of 100.`;
}

async function handleSuccessCategories(json) {
  if (!categoriesHandled) {
    cityNotFound.textContent = '';
    cityCategories.textContent = ''; // Clear existing content

    if (json.categories && json.categories.length > 0) {
      cityCategories.textContent = 'Categories:';
      json.categories.forEach(category => {
        const categoryParagraph = document.createElement('li');
        categoryParagraph.classList.add('city-paragraph');
        categoryParagraph.innerHTML = `${category.name}: <b>${category.score_out_of_10.toFixed(2)} out of 10.</b>`;
        cityCategories.appendChild(categoryParagraph);
      });
    } else {
      cityCategories.textContent = 'No categories available for this city.';
    }
  }
}

async function handleSuccessCity(json) {
  cityNotFound.textContent = '';
  cityName.textContent = json._embedded["city:search-results"][0].matching_full_name;
}

function handleFailure(error) {
  cityName.textContent = '';
  citySummary.textContent = '';
  citySummary.style.border = 'none';
  citySummary.style.backgroundColor = 'transparent';
  cityCategories.textContent = '';
  cityScore.textContent = '';
  cityName.classList.add('city-info-error');
  citySummary.classList.add('city-info-error');
  cityCategories.classList.add('city-info-error');
  cityScore.classList.add('city-info-error');
  cityNotFound.classList.add('city-info-error');
  console.error('There is an error in the request:', error);
  cityNotFound.textContent = 'Your city is not in our database. Please try again.';
}

async function fetchData(url, successCallback) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Request error');
    }
    const json = await response.json();
    successCallback(json);
  } catch (error) {
    handleFailure(error);
  }
}

async function takeCity() {
  let city = document.getElementById('cityInput').value.toLowerCase();
  city = city.replace(/ /g, "-");
  const url = `https://api.teleport.org/api/cities/?search=${city}`;
  fetchData(url, handleSuccessCity);
}

async function takeInfo() {
  let cityInfo = document.getElementById('cityInput').value.toLowerCase();
  cityInfo = cityInfo.replace(/ /g, "-");
  const url = `https://api.teleport.org/api/urban_areas/slug:${cityInfo}/scores/`;
  fetchData(url, handleSuccessInfo);
}

async function takeCategories() {
  let cityInfo = document.getElementById('cityInput').value.toLowerCase();
  cityInfo = cityInfo.replace(/ /g, "-");
  const url = `https://api.teleport.org/api/urban_areas/slug:${cityInfo}/scores/`;
  fetchData(url, handleSuccessCategories);
}

btn.addEventListener('click', async function() {
  await takeCity();
  await takeInfo();
  await takeCategories();
});
