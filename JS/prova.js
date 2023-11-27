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

async function takeInfos(){
  let city = document.getElementById('cityInput').value.toLowerCase();

  const urls = [
    `https://api.teleport.org/api/cities/?search=${city}`,
    `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`]

  const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  const promises = urls.map(url => fetchData(url));

  Promise.all(promises)
  .then(results => {
    // results è un array contenente i risultati delle richieste fetch
    handleSuccess(results);
  })
  .catch(error => {
    handleFailure(error);
  });
}

btn.addEventListener('click', function(){
  takeInfos();
});