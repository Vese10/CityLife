const btn = document.querySelector('button');
const div = document.querySelector('div');
const cityName = document.createElement('p');
const citySummary = document.createElement('p');
const cityScore = document.createElement('p');
const cityNotFound = document.createElement('p');
const cityCategories = document.createElement('ul');

div.appendChild(cityName);
div.appendChild(citySummary);
div.appendChild(cityScore);
div.appendChild(cityNotFound);
div.appendChild(cityCategories);

let categoriesHandled = false; // Flag to track whether handleSuccessCategories has been executed

async function handleSuccessInfo(json) {
  cityNotFound.textContent = '';
  citySummary.textContent = json.summary;
  cityScore.textContent = `The teleport city score is: ${json.teleport_city_score.toFixed(2)} out of 100.`;
}

async function handleSuccessCategories(json) {
  if (!categoriesHandled) {
    cityNotFound.textContent = '';
    cityCategories.textContent = ''; // Clear existing content

    if (json.categories && json.categories.length > 0) {
      cityCategories.textContent = 'Categories:';
      json.categories.forEach(category => {
        const categoryParagraph = document.createElement('li');
        categoryParagraph.textContent = `${category.name}: ${category.score_out_of_10.toFixed(2)} out of 10.`;
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
  cityCategories.textContent = '';
  cityScore.textContent = '';
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
