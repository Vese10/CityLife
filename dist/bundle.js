(()=>{const e=document.querySelector("button"),t=document.querySelector("div"),n=document.createElement("p");n.classList.add("city");const r=document.createElement("p");r.style.border="none",r.style.backgroundColor="transparent",r.classList.add("city-summary");const a=document.createElement("p");a.classList.add("city-score");const o=document.createElement("p");o.classList.add("city-not-found");const c=document.createElement("ul");c.classList.add("city-categories"),t.appendChild(n),t.appendChild(a),t.appendChild(r),t.appendChild(o),t.appendChild(c);async function s(e){e&&e.summary&&void 0!==e.teleport_city_score?(o.textContent="",r.innerHTML=e.summary,r.style.border="2px solid #000000",r.style.backgroundColor="#ffffff",a.innerHTML=`The teleport city score is: <br> ${e.teleport_city_score.toFixed(2)} out of 100.`):l(new Error("Invalid data received"))}async function i(e){o.textContent="",c.textContent="",e&&e.categories&&Array.isArray(e.categories)?(c.textContent="Categories:",e.categories.forEach((e=>{const t=document.createElement("li");t.classList.add("city-paragraph"),e.name&&void 0!==e.score_out_of_10?t.innerHTML=`${e.name}: <b>${e.score_out_of_10.toFixed(2)} out of 10.</b>`:l(new Error("Invalid category data received")),c.appendChild(t)}))):l(new Error("Invalid category data received"))}async function d(e){if(e&&e._embedded&&e._embedded["city:search-results"]&&e._embedded["city:search-results"].length>0){const t=e._embedded["city:search-results"][0].matching_full_name;t?(o.textContent="",n.textContent=t):l(new Error("Invalid city name data received"))}else l(new Error("Invalid city data received"))}function l(e){n.textContent="",r.textContent="",r.style.border="none",r.style.backgroundColor="transparent",c.textContent="",a.textContent="",n.classList.add("city-info-error"),r.classList.add("city-info-error"),c.classList.add("city-info-error"),a.classList.add("city-info-error"),o.classList.add("city-info-error"),console.error("There is an error in the request:",e),o.textContent="Your city is not in our database. Please try again."}async function u(e,t){try{const n=await fetch(e);if(!n.ok)throw new Error("Request error");t(await n.json())}catch(e){l(e)}}e.addEventListener("click",(async function(){await async function(){let e=document.getElementById("cityInput").value.toLowerCase();e=e.replace(/ /g,"-"),u(`https://api.teleport.org/api/cities/?search=${e}`,d)}(),await async function(){let e=document.getElementById("cityInput").value.toLowerCase();e=e.replace(/ /g,"-"),u(`https://api.teleport.org/api/urban_areas/slug:${e}/scores/`,s)}(),await async function(){let e=document.getElementById("cityInput").value.toLowerCase();e=e.replace(/ /g,"-"),u(`https://api.teleport.org/api/urban_areas/slug:${e}/scores/`,i)}()}))})();