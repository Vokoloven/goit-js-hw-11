import './css/styles.css';
import './css/flex-box-img.css';
import { NewsApiService } from './js/newApiService';
import photoCardTpl from './template/photo-card.hbs';
import { ResetDefaultSettings } from './js/defaultSettings';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const newsApiService = new NewsApiService();
const defaultSettings = new ResetDefaultSettings();
defaultSettings.hiddenButton();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.elements.searchQuery.value;

  newsApiService.resetPage();
  refs.searchForm.reset();

  newsApiService.fetchHits().then(hits => enumerationFetches(hits));
  defaultSettings.showButton();
  defaultSettings.clearHitsContainer();
}

function onLoadMore() {
  defaultSettings.hiddenButton();
  newsApiService.fetchHits().then(hits => enumerationFetches(hits));
  defaultSettings.showButton();
}

function enumerationFetches(hits) {
  for (let i = 0; i < hits.length; i += 1) {
    refs.gallery.insertAdjacentHTML('beforeend', photoCardTpl(hits[i]));
  }
}
