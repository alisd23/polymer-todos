class NotFound extends Polymer.Element {
  static get is() { return 'not-found-component'; }
  static get properties() {
    return {
      // This shouldn't be neccessary, but the Analyzer isn't picking up
      // Polymer.Element#rootPath
      rootPath: String,
    };
  }
}

window.customElements.define(NotFound.is, NotFound);
