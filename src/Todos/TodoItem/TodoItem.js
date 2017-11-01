class TodoItem extends Polymer.Element {
  static get is() { return 'todo-item-component'; }

  static get properties() {
    return {
      text: String,
      notes: String,
      completed: Boolean,
      updateTodo: Function
    };
  }

  _toggleCompleted() {
    const updates = { completed: !this.completed };
    this.dispatchEvent(new CustomEvent('update', { detail: updates }));
  }
}

window.customElements.define(TodoItem.is, TodoItem);
