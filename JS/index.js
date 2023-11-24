const btn = document.querySelector('button');
const div = document.querySelector('div');
const citySummary = document.createElement('p');
  citySummary.textContent = '';
  div.appendChild(citySummary);
const cityScore = document.createElement('p');
  cityScore.textContent = '';
  div.appendChild(cityScore);
const cityNotFound = document.createElement('p');
  cityNotFound.textContent = '';
  div.appendChild(cityNotFound);

function handleSuccess(json) {
  cityNotFound.textContent = '';
  
  // Create city summary paragraph
  citySummary.textContent = json.summary;


  // Create city score paragraph
  cityScore.textContent = json.teleport_city_score;
}

// Error handling
function handleFailure(error) {

  citySummary.textContent = '';
  cityScore.textContent = '';
  console.error('There is an error in the request:', error);
  cityNotFound.textContent = 'Your city is not in our database. Please try again.';
}

// Define function to handle city data input
function takeInfo() {

  // Get city value from input field
  let city = document.getElementById('cityInput').value.toLowerCase();
  // Set API URL using city value
  const url = `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`;

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
      handleSuccess(json);
    })
    .catch(error => {
      // Handle failed API request
      handleFailure(error);
    });
}


btn.addEventListener('click', takeInfo);

