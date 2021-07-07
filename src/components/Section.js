// вставка элементов в разметку
class Section {
  constructor(data, containerSelector) {
    this._items = data.items;
    this._renderer = data.renderer;
    this._container = document.querySelector(containerSelector);
  }

  addInitData(items){
    this._items = items;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item); 
    });
  }

  addItem(element) {
    // this._container.append(element);
    this._container.prepend(element);
  }

}

export default Section;