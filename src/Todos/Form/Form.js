class Form extends Polymer.Element {
  static get is() { return 'form-component'; }

  static get properties() {
    return {
      fields: {
        type: Array
      },
      submitText: {
        type: String
      }
    };
  }

  _isInput(name) {
    return name === 'input';
  }
  _isTextarea(name) {
    return name === 'textarea';
  }
  _errorExists(error) {
    return Boolean(error);
  }
  _clearErrors(e) {
    e.model.item.error = null;
    this.notifyPath(`fields.${e.model.index}.error`);
  }

  /**
   * Loop through the fields array and validate the appropriate Element
   * property using the fields validate function
   * @return {object} errors key-value object
   */
  _validate() {
    let hasError = false;
    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i];
      const error = field.validate(field.value);
      field.error = error;
      if (error) {
        hasError = true;
        this.notifyPath(`fields.${i}.error`);
      }
    }
    return hasError;
  }

  _resetForm() {
    for (let i = 0; i < this.fields.length; i++) {
      this.fields[i].value = this.fields[i].defaultValue || '';
      this.notifyPath(`fields.${i}.value`);
    }
  }

  _onSubmit(e) {
    e.preventDefault();

    const hasError = this._validate();

    if (!hasError) {
      const formData = this.fields.reduce(
        (result, field) => Object.assign(result, { [field.name]: field.value }),
        {}
      );
      this.dispatchEvent(new CustomEvent('submit', { detail: formData }));
      this._resetForm();
    }
  }
}

window.customElements.define(Form.is, Form);
