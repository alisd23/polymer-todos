class App extends Polymer.Element {
  static get is() { return 'app-component'; }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged',
      },
      routeData: Object,
      subroute: String,
      // This shouldn't be neccessary, but the Analyzer isn't picking up
      // Polymer.Element#rootPath
      rootPath: String,
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)',
    ];
  }

  _routePageChanged(page) {
    // If no page was found in the route data, page will be an empty string.
    // Default to 'view1' in that case.
    this.page = page || 'todos';

    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }

  _pageChanged(page) {
    // Load page import on demand. Show 404 page if fails
    const folder = page.replace(
      /(?:^(.)|\-(.))/g,
      (match, c1, c2) => (c1 || c2).toUpperCase()
    );
    const resolvedPageUrl = this.resolveUrl(`../${folder}/${folder}.html`);

    Polymer.importHref(
      resolvedPageUrl,
      null,
      this._showPage404.bind(this),
      true
    );
  }

  _showPage404() {
    this.page = 'not-found';
  }
}

window.customElements.define(App.is, App);
