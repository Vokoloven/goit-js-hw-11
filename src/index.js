import './css/styles.css';
import './css/flex-box-img.css';
import { NewsApiService } from './js/newApiService';
import photoCardTpl from './template/photo-card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import '../node_modules/simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

let minusPerPage = 0;

const newsApiService = new NewsApiService();
hiddenButton();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  newsApiService.resetPage();
  newsApiService.resetPerPage();
  refs.searchForm.reset();

  newsApiService.fetchHits().then(data => {
    checkingForError(data.totalHits, data.hits.length, minusPerPage);
    enumerationFetches(data.hits);
    scrollDown();
  });

  clearHitsContainer();
}

function onLoadMore() {
  hiddenButton();

  minusPerPage = newsApiService.perPage;

  newsApiService.fetchHits().then(data => {
    checkingForError(data.totalHits, data.hits.length, minusPerPage);

    enumerationFetches(data.hits);
    scrollDown();
  });

  // showButton();
}

function enumerationFetches(hits) {
  for (let i = 0; i < hits.length; i += 1) {
    refs.gallery.insertAdjacentHTML('beforeend', photoCardTpl(hits[i]));
  }
  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
  });
  lightbox.refresh();
}

function hiddenButton() {
  refs.loadMoreBtn.style.display = 'none';
}

function showButton() {
  refs.loadMoreBtn.style.display = '';
}
function clearHitsContainer() {
  refs.gallery.innerHTML = '';
}

function scrollDown() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function checkingForError(totalHits, hitsLength, minusPerPage) {
  if (hitsLength === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    hiddenButton();
  } else if (minusPerPage > totalHits) {
    Notify.warning(
      'We are sorry, but you have reached the end of search results.'
    );
    hiddenButton();
  } else {
    showButton();
    Notify.success(`Hooray! We found ${totalHits} images.`);
  }
}
