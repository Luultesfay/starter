//MVC (MODEL VIEW CONTROLLER)
/*
MVC is an architectural pattern consisting of three parts: Model, View, Controller. 
-Model: Handles data logic.
- View: It displays the information from the model to the user. 
-Controller: It controls the data flow into a model object and updates the view whenever data changes
*/
//HERE WE WILL REFACTOR THE  MODEL

import { async } from 'regenerator-runtime';
import { API_URL, KEY } from './config.js';
//import { RES_PER_PAGE } from './config.js';
//import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: 10, //RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    cookingTime: recipe.cooking_time,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    //this is condtionally add propertity to object
    ...(recipe.key && { key: recipe.key }), //if recipe.key is true then   key:recipe.key,  else there is no key to return
  };
};
//this function is responsible for fecthing  data from forkfy Api
export const loadRecipe = async function (id) {
  try {
    //const data = await getJSON(`${API_URL}${id}`);//get getJSON is now changed by AJAX becouse we refactored in the helper.js by AJAX
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`); //getJSON is now changed by AJAX becouse we refactored in the helper.js by AJAX
    state.recipe = createRecipeObject(data);

    //this checks if the the  coming recipe is  bookmarked or not  earler  ,
    // then if it is there in the book marked  then we set that coming recipe is set to true

    // this is looping over the array of bookmarked recipe id   then compired it with the recipe id of the coming one
    //if it muches it marked as true other wise set to false
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;

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
    //const data = await getJSON(`${API_URL}?search=${query}`);
    const data = await AJAX(`${API_URL}?search=${query}&?key=${KEY}`);
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
  state.search.page = 1; //this reset the page to the first page every time we search
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

//ADD THE BOOKMARKS TO THE LOCAL STORAGE

const persistentBkMarkWlocalStorage = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks)); //stringify() method converts a JavaScript object or value to a JSON string,
};

//to add a recipe as book marked
//note  if we need to book mark a recipe we need the entire data of the recipe to delete it only we need to pass the id
export const addBookMark = function (recipe) {
  //add book mark

  state.bookmarks.push(recipe);

  // mark current RECIPE as book mark

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistentBkMarkWlocalStorage();
};

// to unmark  the recipe from bookmark or to delete the recipe as marked

export const deleteBookMark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  //MARK CURRENT RECIPE AS  NOT MARKED
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistentBkMarkWlocalStorage();
};

//GET THE BOOKMARK DATA FROM THE LOCAL STORAGE AND CHANGE IT TO OBJECT  AND RETAIN THE PREVIOUS BOOKMARK  OF THE PAGE
//AFTER LOADING THE PAGE

const init = function () {
  const storage = localStorage.getItem('bookmarks'); //we get the bookmaked recipe from local storage
  if (storage) state.bookmarks = JSON.parse(storage); //Parse the data with JSON.parse() , and the data becomes a JavaScript object.
};
init();
console.log(state.bookmarks);

//we are formatting the new recipe data that we want to publish to the forkify api

//we are accepting new recipe then we change to array using Object.entrie()method
//  then fillter the first entry starttwith ingrident and the secound entry should be  non empty
//and looping over the array and destructure them to the 3 type,
export const uploadRecipe = async function (newRecipe) {
  //console.log(Object.entries(newRecipe)); //entries() change objects to array  its oppsit to  Fromentries() method
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1]
          .replaceAll(' ', '') //replacing all white spaces
          .split(','); //and split with ','

        if (ingArr.length !== 3)
          throw new Error(
            'wrong ingrident format! please use the correct format'
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    //the new recipe to send to the server
    const recipe = {
      title: newRecipe.title,
      servings: +newRecipe.servings,
      //description: newRecipe.descripiton,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      source_url: newRecipe.sourceUrl,
      ingredients,
    };
    //console.log(recipe);
    //AJAX REPLACE sendJSON
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe); //https://forkify-api.herokuapp.com/api/v2/recipes/?key='ef5dfcdb-2435-4704-99d4-55059527185f',recipe;

    state.recipe = createRecipeObject(data);
    addBookMark(state.recipe);
  } catch (err) {
    throw err;
  }
};
