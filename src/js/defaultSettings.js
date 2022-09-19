export class ResetDefaultSettings {
  constructor() {}
  hiddenButton() {
    refs.loadMoreBtn.style.display = 'none';
  }
  showButton() {
    refs.loadMoreBtn.style.display = '';
  }

  clearHitsContainer() {
    refs.gallery.innerHTML = '';
  }
}
