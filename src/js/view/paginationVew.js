import views from './views.js';

import icons from 'url:../../img/icons.svg'; //parcel2
class PaginationView extends views {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numberOfPages = this._data.results.length / this._data.resultsPerPage;

    console.log(numberOfPages);
    //1, page 1 and other pages

    //2, other pages

    //3, page1 no other pages

    //4, last page
  }
}
export default new PaginationView();
