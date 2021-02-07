const searchBtn = document.getElementById("meal-btn");
const allMeal = document.getElementById("all-meal-section");
const popUpCloseBtn = document.getElementById("recipe-close");
const mealDetailContent = document.querySelector(".meal-detail-content");

searchBtn.addEventListener('click', function () {
    let searchInput = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
        .then(res => res.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `<div class="meal-item" data-id = "${meal.idMeal}">
                                <div class="meal-img">
                                 <img src="${meal.strMealThumb}" alt="">
                                </div>
                                <div class="meal-name">
                                  <h3>${meal.strMeal}</h3>
                                  <a href="#" class="food-btn">Get Details</a>
                                </div>
                            </div>`;
                });
            }else{
                html = "Sorry, We didn't find any meal";
            }
            allMeal.innerHTML = html;
        });
});
