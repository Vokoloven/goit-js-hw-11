const axios = require('axios').default;

export class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.perPage = 40;
    this.page = 1;
  }

  async fetchHits() {
    const KEY = '30004460-7b1cd4f1171d7a16584b31c7f';
    const URL = `https://pixabay.com/api/?key=${KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

    try {
      const resp = await axios.get(URL);
      const data = await resp.data;

      this.incrementPage();
      this.incrementPerPage();

      return data;
    } catch (error) {
      error = new Error().stack;
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  incrementPerPage() {
    this.perPage += 40;
  }

  resetPerPage() {
    this.perPage = 40;
  }

  get query() {
    return this.searchQuery;
  }

  set query(NewQuery) {
    this.searchQuery = NewQuery;
  }
}
