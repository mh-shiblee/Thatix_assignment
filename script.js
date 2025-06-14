const cardContainer = document.getElementById("card-container");

async function getMeals() {
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

  try {
    const response = await fetch(url);
    const result = await response.json();
    const meals = result.meals;


    for (let i = 0; i < 25; i++) {
      const meal = meals[i];

      const cardHTML = `
        <div class="col-md-3 mb-4">
          <div class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
            <div class="card-body">
              <h5 class="card-title">${meal.strMeal}</h5>
              <p class="card-text">Recipe: ${meal.strInstructions}</p>
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


let mybutton = document.getElementById("btn-back-to-top");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) 
    {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

getMeals();

