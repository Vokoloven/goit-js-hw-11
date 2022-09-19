import { Notify } from 'notiflix/build/notiflix-notify-aio';
const axios = require('axios').default;

export class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchHits() {
    const KEY = '30004460-7b1cd4f1171d7a16584b31c7f';
    const URL = `https://pixabay.com/api/?key=${KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

    try {
      const resp = await axios.get(URL);
      const data = await resp.data;

      if (data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      this.incrementPage();

      return data.hits;
    } catch (error) {
      console.error(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(NewQuery) {
    this.searchQuery = NewQuery;
  }
}
