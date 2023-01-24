const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = " ";
const APP_ID = "464104f0";
const APP_KEY = "de0da08f3dd53bf4ff7acdc0df8e97a9";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});

async function fetchAPI() {
  const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHTML(data.hits);
}

function generateHTML(results) {
  let generatedHTML = " ";
  results.map((result) => {
    generatedHTML += `
    <div class="item">
    <img src="${result.recipe.image}" alt="Image" />
    <div class="flex-container">
      <h1 class="title">${result.recipe.label}</h1>
      <a href="${result.recipe.url}" target="_blank">View Recipe</a>
    </div>
    <p class="item-data">Calories:${Math.round((result.recipe.calories))}</p>
    </div>
        
        `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}
