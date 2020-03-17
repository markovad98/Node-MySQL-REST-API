const Todo = require("../models/todo");

const users = [
  { name: "Alex", age: 21, email: "Alex@mail.ru" },
  { name: "Danya", age: 20, email: "Danya@mail.ru" }
];

module.exports = {
  test() {
    return {
      count: Math.trunc(Math.random() * 10),
      users
    };
  },
  random({ min, max, count }) {
    const arr = [];

    for (let i = 0; i < count; i++) {
      const random = Math.random() * (max - min) + min;
      arr.push(random);
    }

    return arr;
  },
  async getTodos() {
    try {
      return await Todo.findAll();
    } catch (err) {
      throw new Error(err);
    }
  },

  async createTodo({ todo }) {
    try {
      return await Todo.create({
        title: todo.title,
        done: false
      });
    } catch (err) {
      throw new Error(err);
    }
  },
  async completeTodo({ id }) {
    try {
      const todo = await Todo.findByPk(Number(id));
      todo.done = true;
      await todo.save();
      return todo;
    } catch (err) {
      throw new Error(err);
    }
  },
  async deleteTodo({ id }) {
    try {
      const todo = await Todo.findByPk(Number(id));
      await todo.destroy();
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
};
