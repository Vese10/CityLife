const btn = document.querySelector('button');
const div = document.querySelector('div');
const paragrafo = document.createElement('p');

function addParagrafo(){
  paragrafo.textContent = 'Elemento creato dinamicamente. ';
  div.appendChild(paragrafo);
}

btn.addEventListener('click', addParagrafo);