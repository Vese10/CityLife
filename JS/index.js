const btn = document.querySelector('button');
const div = document.querySelector('div');

function takeInfo() {
  let city = document.getElementById('cityInput').value.toLowerCase();
  const url = `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Errore nella richiesta');
      }
      return response.json();
    })
    .then(json => {
      console.log(json.summary);
      const paragrafo = document.createElement('p');
      paragrafo.textContent = city;
      div.appendChild(paragrafo);
    })
    .catch(error => {
      console.error('Si è verificato un errore durante la richiesta:', error);
    });
}

btn.addEventListener('click', takeInfo);

