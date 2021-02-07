const searchBtn = document.getElementById("meal-btn");
const allMeal = document.getElementById("all-meal-section");
const popUpCloseBtn = document.getElementById("recipe-close");
const getDetailBtn = document.getElementById("getDetail-btn");
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
                                  <a href="#" class="food-btn" id ="getDetail-btn">Get Details</a>
                                </div>
                            </div>`;
                });
                allMeal.classList.remove('notFound');
            }else{
                html = "Sorry, We didn't find any meal";
                allMeal.classList.add('notFound');
            }
            allMeal.innerHTML = html;
        });
});

allMeal.addEventListener('click', function(e){
    e.preventDefault();
    if(e.target.classList.contains('food-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(res => res.json())
        .then(data => mealRecipeModal(data.meals));
    }
})
function mealRecipeModal(meal){
    meal = meal[0];
    let html = `<h2 class="meal-title">${meal.strMeal}</h2>
                <p class="meal-category">${meal.strCategory}</p>
                <div class="meal-description">
                    <h3>Description:</h3>
                    <p>${meal.strInstructions}</p>
                </div>
                <div class="meal-img-popup">
                    <img src="${meal.strMealThumb}" alt="">
                </div>`;
                mealDetailContent.innerHTML = html;
                mealDetailContent.parentElement.classList.add
                ('showPopUp');
}

popUpCloseBtn.addEventListener("click", ()=>{
    mealDetailContent.parentElement.classList.remove("showPopUp");
})