/*
const btn = document.querySelector('button');
const div = document.querySelector('div');
const cityName = document.createElement('p');
  cityName.textContent = '';
  div.appendChild(cityName);
const citySummary = document.createElement('p');
  citySummary.textContent = '';
  div.appendChild(citySummary);
const cityScore = document.createElement('p');
  cityScore.textContent = '';
  div.appendChild(cityScore);
const cityNotFound = document.createElement('p');
  cityNotFound.textContent = '';
  div.appendChild(cityNotFound);
const cityCategories = document.createElement('p');
  cityCategories.textContent = '';
  div.appendChild(cityCategories);
const categoryParagraph = document.createElement('p');
  categoryParagraph.textContent = '';
  div.appendChild(categoryParagraph);

function handleSuccessInfo(json) {
  cityNotFound.textContent = '';

  // Create city summary paragraph
  citySummary.textContent = json.summary;

  // Create city score paragraph
  cityScore.textContent = "The teleport city score is: " + json.teleport_city_score.toFixed(2) + " out of 100.";
}

function handleSuccessCategories(json) {
  cityNotFound.textContent = '';

  // Create city categories paragraphs
  if (json.categories && json.categories.length > 0) {
    cityCategories.textContent = 'Categories:';
    
    // Create a separate paragraph for each category and score
    json.categories.forEach(category => {
      const categoryParagraph = document.createElement('p');
      categoryParagraph.textContent = `${category.name}: ${category.score_out_of_10.toFixed(2)} out of 10.`;
      div.appendChild(categoryParagraph);
    });
  }
}

function handleSuccessCity(json) {
  cityNotFound.textContent = '';

  // Create city name
  cityName.textContent = json._embedded["city:search-results"][0].matching_full_name;
}

// Error handling
function handleFailure(error) {

  cityName.textContent = '';
  citySummary.textContent = '';
  cityCategories.textContent = '';
  cityScore.textContent = '';
  categoryParagraph.textContent = '';
  console.error('There is an error in the request:', error);
  cityNotFound.textContent = 'Your city is not in our database. Please try again.';
}

//Define function to handle city name
async function takeCity() {
  // Get city value from input field
  let city = document.getElementById('cityInput').value.toLowerCase();
  // Set API URL using city value
  const url = `https://api.teleport.org/api/cities/?search=${city}`;
  // Fetch data from API
  fetch(url)
    .then(response => {
      // Check if response is OK
      if (!response.ok) {
        throw new Error('Request error');
      }
      // Return response JSON data
      return response.json();
    })
    .then(json => {
      // Handle successful API request
      handleSuccessCity(json);
    })
    .catch(error => {
      // Handle failed API request
      handleFailure(error);
    });
}

// Define function to handle city data input
async function takeInfo() {

  // Get city value from input field
  let cityInfo = document.getElementById('cityInput').value.toLowerCase();
  // Set API URL using city value
  const url = `https://api.teleport.org/api/urban_areas/slug:${cityInfo}/scores/`;

  // Fetch data from API
  fetch(url)
    .then(response => {
      // Check if response is OK
      if (!response.ok) {
        throw new Error('Request error');
      }
      // Return response JSON data
      return response.json();
    })
    .then(json => {
      // Handle successful API request
      handleSuccessInfo(json);
    })
    .catch(error => {
      // Handle failed API request
      handleFailure(error);
    });
}
async function takeCategories() {

  // Get city value from input field
  let cityInfo = document.getElementById('cityInput').value.toLowerCase();
  // Set API URL using city value
  const url = `https://api.teleport.org/api/urban_areas/slug:${cityInfo}/scores/`;

  // Fetch data from API
  fetch(url)
    .then(response => {
      // Check if response is OK
      if (!response.ok) {
        throw new Error('Request error');
      }
      // Return response JSON data
      return response.json();
    })
    .then(json => {
      // Handle successful API request
      handleSuccessCategories(json);
    })
    .catch(error => {
      // Handle failed API request
      handleFailure(error);
    });
}

btn.addEventListener('click', function() {
  takeCity();
  takeInfo();
  takeCategories();
});
*/

const btn = document.querySelector('button');
const div = document.querySelector('div');

function handleSuccess(json){
  const cityNotFound = document.createElement('p');
  cityNotFound.textContent = '';
  div.appendChild(cityNotFound);

  const cityName = document.createElement('p');
  cityName.textContent = json._embedded["city:search-results"][0].matching_full_name;
  div.appendChild(cityName);

  const citySummary = document.createElement('p');
  citySummary.textContent = json.summary
  div.append(citySummary);

  const cityScore = document.createElement('p');
  cityScore.textContent = "The teleport city score is: " + json.teleport_city_score.toFixed(2) + " out of 100.";

  json.categories.forEach(category => {
    const categoryParagraph = document.createElement('p');
    categoryParagraph.textContent = `${category.name}: ${category.score_out_of_10.toFixed(2)} out of 10.`;
    div.appendChild(categoryParagraph);
  });
}

function handleFailure(error){
  const cityNotFound = document.createElement('p');
  cityNotFound.textContent = 'Your city is not in our database. Please try again.';
  div.appendChild(cityNotFound);
}

async function takeInfos() {
  try {
    let city = document.getElementById('cityInput').value.toLowerCase();

    const urls = [
      `https://api.teleport.org/api/cities/?search=${city}`,
      `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`
    ];

    const fetchData = async (url) => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
      }

      return response.json();
    };

    const results = await Promise.all(urls.map(url => fetchData(url)));

    // Log the results to inspect the structure
    console.log('Results:', results);

    // Assuming the structure of the JSON response, adjust accordingly
    handleSuccess({
      cityInfo: results[0],
      cityScores: results[1]
    });
  } catch (error) {
    console.error('Error in takeInfos:', error);
    handleFailure(error);
  }
}

btn.addEventListener('click', function(){
  takeInfos();
});