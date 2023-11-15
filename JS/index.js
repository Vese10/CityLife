const btn = document.querySelector('button');
const div = document.querySelector('div');
const paragrafo = document.createElement('p');

/*
function addParagrafo(){
  paragrafo.textContent = 'Elemento creato dinamicamente. ';
  div.appendChild(paragrafo);
}

btn.addEventListener('click', addParagrafo);
*/



function takeInfo(){
  const city = document.querySelector('#cityInput').value;
  

  fetch(`https://api.teleport.org/api/urban_areas/slug:${city}/scores/`)
  .then(response => response.json())
  .then(json => {
    classeFetch = json;
    console.log(json.summary);
  });
}

btn.addEventListener('click', takeInfo);
