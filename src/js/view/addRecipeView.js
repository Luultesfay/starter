import views from './views.js';

import icons from 'url:../../img/icons.svg'; //parcel2
class AddRecipeView extends views {
  _parentElement = document.querySelector('.upload');

  _message = 'you are uploded new recipe succesfully congrats 😄';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow(); //_ indicate  the method is protected
    this._addHandlerCloseWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden'); //If force is not given, "toggles" token, removing it if it's present and adding it if it's not present
    this._window.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this)); //  (this)  in the braket points to the object not to the btnOpen
  }

  _addHandlerCloseWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  //uploding form or submmision form
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      //to get the value from the form we need special data collector method  which is FormData();
      // the data is the one which we want to send or publish to the API
      const dataArr = [...new FormData(this)]; //this here is points to the parent element
      const data = Object.fromEntries(dataArr); //fromEntries is a method take an array of entris and change them to object entries
      // console.log(this);
      handler(data);
    });
  }

  _generateMarkup() {}
}
export default new AddRecipeView();
