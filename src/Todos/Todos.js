const fields = [
  {
    name: 'text',
    type: 'input',
    placeholder: 'Todo text',
    validate: (value) => {
      if (!value) {
        return 'Todo text is required';
      }
    }
  },
  {
    name: 'notes',
    type: 'textarea',
    placeholder: 'Notes (optional)',
    validate: () => {}
  }
];

class Todos extends Polymer.Element {
  static get is() { return 'todos-component'; }

  static get properties() {
    return {
      todos: {
        type: Array,
        value: []
      },
      formFields: {
        type: Array,
        value: fields
      }
    };
  }

  _addTodo(e) {
    const newTodo = e.detail;
    this.push('todos', newTodo);
  }

  _updateTodo(e) {
    const updates = e.detail;
    Object.assign(this.todos[e.model.index], updates);
    // console.log(this.)
    this.notifyPath(`todos.${e.model.index}.completed`);
  }
}

window.customElements.define(Todos.is, Todos);
