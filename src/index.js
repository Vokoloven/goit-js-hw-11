import './css/styles.css';
import './css/flex-box-img.css';
import { NewsApiService } from './js/newApiService';
import photoCardTpl from './template/photo-card.hbs';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const newsApiService = new NewsApiService();
hiddenButton();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.elements.searchQuery.value;

  newsApiService.resetPage();
  refs.searchForm.reset();

  newsApiService.fetchHits().then(hits => enumerationFetches(hits));
  showButton();
  clearHitsContainer();
}

function onLoadMore() {
  hiddenButton();
  newsApiService.fetchHits().then(hits => enumerationFetches(hits));
  showButton();
}

function enumerationFetches(hits) {
  for (let i = 0; i < hits.length; i += 1) {
    refs.gallery.insertAdjacentHTML('beforeend', photoCardTpl(hits[i]));
  }
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
