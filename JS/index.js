const btn = document.querySelector('button');
const div = document.querySelector('div');

function takeInfo() {

  let city = document.getElementById('cityInput').value.toLowerCase();
  const url = `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Request error');
      }
      return response.json();
    })
    .then(json => {
      const citySummary = document.createElement('p');
      citySummary.textContent = json.summary;
      div.appendChild(citySummary);
      const cityScore = document.createElement('p');
      cityScore.textContent = json.teleport_city_score;
      div.appendChild(cityScore);
    })
    .catch(error => {
      console.error('There is an errore in the request:', error);
      const cityNotFound = document.createElement('p');
      cityNotFound.textContent = 'Your city is not in our database. Please try again.';
      div.appendChild(cityNotFound);
    });
}

btn.addEventListener('click', takeInfo);

