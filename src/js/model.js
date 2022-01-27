//MVC (MODEL VIEW CONTROLLER)
/*
MVC is an architectural pattern consisting of three parts: Model, View, Controller. 
-Model: Handles data logic.
- View: It displays the information from the model to the user. 
-Controller: It controls the data flow into a model object and updates the view whenever data changes
*/
//HERE WE WILL REFACTOR THE  MODEL

import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
};

//this function is responsible for fecthing  data from forkfy Api
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
    console.log(state.recipe);
  } catch (err) {
    console.error(`${err}💥💥💥`);
    throw err; //error thrown  and hundled by the controller  then passed the message to the view for display
  }
};

//load search result

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        image: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
      };
    });
    //console.log(state.search.results);
  } catch (err) {
    console.error(`${err}💥💥💥`);
    throw err;
  }
};

//lets make the result 10 per page

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; //0;
  const end = page * state.search.resultsPerPage; //9;
  console.log(state.search.resultsPerPage);
  console.log(start, end);
  return state.search.results.slice(start, end); //this will not include the last digit eg  (1,10); this mean    (1,9)
};

export const updateServings = function (newServings) {
  const oldNumberOfServing = state.recipe.servings;

  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / oldNumberOfServing;
    //newQt=oldQt*newServings/old servings  //  2*8/4=4
    //console.log((ing.quantity * newServings) / state.recipe.servings);

    //preserve the new recipe
    state.recipe.servings = newServings;
    //console.log(newServings);
  });
};
