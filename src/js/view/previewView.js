//the secound way and esiest way of making this code dry
/*
In my attempt before looking further into the video, I made PreviewView a child of View, 
and then bookmarksView and resultsView children of PreviewView. So PreviewView extends View, 
and  bookmarksView and resultsView extends PreviewView.
PreviewView keeps both _generateMarkup() and _generateMarkupPreview() while bookmarksView and
 resultsView define their parentElement and messages. 
 */

// import views from './views.js';
// import icons from 'url:../../img/icons.svg'; //parcel2
// export default class PreviewView extends views {
//   //   _parentElement = document.querySelector('.bookmarks__list');
//   //   _ErrorMessage =
//   //     'there is no recipe bookmarked, find a nice recipe to bookmarked';
//   //   _message = '';

//   _generateMarkup() {
//     console.log(this._data);
//     return this._data.map(this._generateMarkupPreview).join(''); // we loop over the preview
//   }
//   _generateMarkupPreview(result) {
//     const id = window.location.hash.slice(1);
//     return `<li class="preview">
//    <a class="preview__link  ${
//      result.id === id ? 'preview__link--active' : ''
//    } " href="#${result.id}">
//     <figure class="preview__fig">
//       <img src="${result.image}" alt='${result.title}' />
//     </figure>
//     <div class="preview__data">
//       <h4 class="preview__title">${result.title}</h4>
//       <p class="preview__publisher">${result.publisher}</p>

//     </div>
//   </a>
// </li>`;
//   }
// }
