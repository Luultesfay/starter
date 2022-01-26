import views from './views.js';

import icons from 'url:../../img/icons.svg'; //parcel2
class PaginationView extends views {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      console.log(gotoPage);
      handler(gotoPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    console.log(numberOfPages);
    //1, page 1 and other pages
    if (curPage === 1 && numberOfPages > 1) {
      return `<button  data-goto= "${curPage + 1}"
      class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    //2, page1 no other pages
    if (curPage === 1) {
      return '';
    }

    //3, last page
    if (curPage === numberOfPages && numberOfPages > 1) {
      return `<button   data-goto= "${curPage - 1}"
       class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;
    }
    //4, other pages
    if (curPage < numberOfPages) {
      return `<button   data-goto= "${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
      <button data-goto= "${curPage + 1}"
      class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
  }
}
export default new PaginationView();
