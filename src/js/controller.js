import * as model from './model.js'; //import all the model
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultView from './view/resultView.js';
import PaginationVew from './view/paginationVew.js';

import 'core-js/stable'; //this is for polyfiling evrything
import 'regenerator-runtime/runtime'; //this is for polyfiling async/await
//this hot module prevent the page from loading whwn ever we change the code but if we remove the hot module  it will load when ever we change codes
// if (module.hot) {
//   module.hot.accept();
// }

//const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//we will create  async function

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1); //we select the hash from the window location of the web page and slice only the number
    console.log(id);
    if (!id) return;

    recipeView.renderSpinner();
    //1,loading recipe

    await model.loadRecipe(id); // data in the model loded with this id

    //2 rendering recipe

    recipeView.render(model.state.recipe); //the data from model passed to the render method in the view // this is the brige between model and view
    console.log(model.state.recipe);
  } catch (err) {
    //alert(err);
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    console.log(resultView);
    //1.  get search query
    const query = searchView.getQuery();
    if (!query) return;
    //2.load search result
    await model.loadSearchResult(query);
    console.log(query);

    //3.render results
    //console.log(model.state.search.results);
    //resultView.render(model.state.search.results); //this give us all the result on the page

    resultView.render(model.getSearchResultPage(4)); //this give us part of the search result per page

    //4 , render pagination inital buttons
    PaginationVew.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (gotoPage) {
  //render NEW results
  resultView.render(model.getSearchResultPage(gotoPage)); //this give us part of the search result per page

  //4 , render new pagination buttons
  PaginationVew.render(model.state.search);
  console.log(gotoPage);
};

//updating new serving
const controlServing = function (newServings) {
  //1 update the recipe servings
  model.updateServings(newServings);
  console.log(newServings);

  //2,update  the recipeView;
  recipeView.render(model.state.recipe);
  console.log(model.state.recipe);
};
//subscriber
//event are handled in the controller and listened in the view
//here we connect controller and view
const init = function () {
  recipeView.eventHandlerRender(controlRecipes); //we are handling the event in  the  controller  that comes from view
  recipeView.addHandlerUpdateServing(controlServing);
  searchView.addHandlerSearch(controlSearchResults); //subscriber
  PaginationVew.addHandlerClick(controlPagination);
};
init();
