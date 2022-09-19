import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { NewsApiService } from './js/newApiService';
import photoCardTpl from './template/photo-card.hbs';

refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.style.display = 'none';
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.searchQuery.value;
  newsApiService.fetchHits().then(hits => enumerationFetches(hits));
  refs.loadMoreBtn.style.display = '';
}

function onLoadMore() {
  newsApiService.fetchHits().then(hits => enumerationFetches(hits));
}

function enumerationFetches(hits) {
  for (let i = 0; i < hits.length; i += 1) {
    refs.gallery.insertAdjacentHTML('beforeend', photoCardTpl(hits[i]));
  }
}
