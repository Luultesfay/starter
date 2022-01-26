import icons from 'url:../../img/icons.svg'; //parcel2
export default class views {
  //this views is parent class  becouse all this is common to all views so they can inherit from it

  _data;
  render(data) {
    console.log(data);
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data; //this data is came from model through controller
    const markup = this._generateMarkup();
    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }

  //spinner function
  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;

    this._clear;
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //error handling in the view
  renderError(message = this._ErrorMessage) {
    //message gets from the controller
    //
    //the massage passed
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p> 
  </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
