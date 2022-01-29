import icons from 'url:../../img/icons.svg'; //parcel2
import { Fraction } from 'fractional'; //first we  installed (npm i fractional ) then inported it
import views from './views.js';
class recipeView extends views {
  _parentElement = document.querySelector('.recipe'); //the whole container that hold the data console.log(document.querySelector('.recipe'))

  _ErrorMessage = 'we coud not find the recipe, try another one';
  _message = '';

  //publisher
  //we put the event listner in the view becouse event shoud be in the view  and event shoud be hundled in the controller
  eventHandlerRender(handler) {
    //handler means  controlRecipes
    // window.addEventListener('hashchange', controlRecipes); //listning the hashchange
    // window.addEventListener('load', controlRecipes);

    //we might have a lot of the same addEventListner() so we can do the eaiser way to do it

    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler)); //the same like the above code
  }

  addHandlerUpdateServing(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings'); //event deligation
      if (!btn) return;
      console.log(btn);

      //const updateTo = +btn.dataset.updateTo; //change to number with +
      const { updateTo } = btn.dataset;
      //console.log(updateTo);
      //we only get handler to update if  the number os serving greater than zero
      if (+updateTo > 0) handler(+updateTo); //change to number with +
      console.log(+updateTo);
    });
  }

  addHandlerAddBookMark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');

      if (!btn) return;
      handler();
    });
  }
  _generateMarkup() {
    return `<figure class="recipe__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>
    
        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>
    
            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings - 1
              }">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to="${
                this._data.servings + 1
              }">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>
    
          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round  btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-${
      this._data.bookmarked === true ? 'bookmark-fill' : 'bookmark'
    } "></use>
            </svg>
          </button>
        </div>
    
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
    
          ${this._data.ingredients.map(this._generateMarkupIngrident).join('')}
            
    
            
          </ul>
        </div>
    
        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">T${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
  }

  _generateMarkupIngrident(ing) {
    {
      return `<li class="recipe__ingredient">
  <svg class="recipe__icon">
    <use href="${icons}#icon-check"></use>
  </svg>
  <div class="recipe__quantity">${
    ing.quantity ? new Fraction(ing.quantity).toString() : ''
  }</div>
  <div class="recipe__description">
    <span class="recipe__unit">${ing.unit}</span>
    ${ing.description}
  </div>
</li>`;
    }
  }
}

export default new recipeView();
