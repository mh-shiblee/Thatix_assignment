const cardContainer = document.getElementById("card-container");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function getMeals(searchTerm = "") {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
  cardContainer.innerHTML = ""; // Clear previous results

  try {
    const response = await fetch(url);
    const result = await response.json();
    const meals = result.meals;

    if (!meals) {
      cardContainer.innerHTML = `<p class='text-center text-danger fw-bold'>No meals found for "${searchTerm}".</p>`;
      return;
    }

    for (let i = 0; i < meals.length && i < 25; i++) {
      const meal = meals[i];

      const cardHTML = `
        <div class="col-md-3 mb-4">
          <div class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">Recipe: ${meal.strInstructions.substring(0, 100)}...</p>
              <button type="button" class="btn btn-warning btn-sm view-details" 
                      data-title="${meal.strMeal}" 
                      data-img="${meal.strMealThumb}" 
                      data-instructions="${meal.strInstructions}">
                View Details
              </button>
            </div>
          </div>
        </div>
      `;

      cardContainer.innerHTML += cardHTML;
    }

    // Attach modal openers
    const detailButtons = document.querySelectorAll(".view-details");
    detailButtons.forEach(button => {
      button.addEventListener("click", () => {
        const title = button.getAttribute("data-title");
        const img = button.getAttribute("data-img");
        const instructions = button.getAttribute("data-instructions");

        document.getElementById("modalTitle").innerText = title;
        document.getElementById("modalImg").src = img;
        document.getElementById("modalInstructions").innerText = instructions;

        const modal = new bootstrap.Modal(document.getElementById("mealModal"));
        modal.show();
      });
    });

  } catch (error) {
    console.log("Something went wrong:", error);
    cardContainer.innerHTML = "<p class='text-danger'>Failed to load meals.</p>";
  }
}

// Search by button click
searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim();
  getMeals(searchTerm);
});

// Also allow Enter key
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchButton.click();
  }
});

// Initial load
getMeals();
