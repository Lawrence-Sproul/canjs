var MemoryModel = require("./can.memory");

// Basic Todo entry model
var Todo = MemoryModel.extend({
}, {
	init: function () {
		// Autosave when changing the text or completing the todo
		this.on('change', function (ev, prop) {
			if (prop === 'text' || prop === 'complete') {
				ev.target.save();
			}
		});
	}
});

// List for Todos
Todo.List = Todo.List.extend({
	filter: function (check) {
		var list = [];

		this.each(function (todo) {
			if (check(todo)) {
				list.push(todo);
			}
		});

		return list;
	},

	completed: function () {
		return this.filter(function (todo) {
			return todo.attr('complete');
		});
	},

	remaining: function () {
		return this.attr('length') - this.completed().length;
	},

	allComplete: function () {
		return this.attr('length') === this.completed().length;
	}
});

module.exports = Todo;