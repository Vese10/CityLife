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

function handleSuccessInfo(json) {
  cityNotFound.textContent = '';

  // Create city summary paragraph
  citySummary.textContent = json.summary;

  // Create city score paragraph
  cityScore.textContent = "The teleport city score is: " + json.teleport_city_score.toFixed(2) + " out of 100.";
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
  cityScore.textContent = '';
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

btn.addEventListener('click', function() {
  takeCity();
  takeInfo();
});
