const { Router } = require("express");
const Todo = require("../models/todo");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({
      message: `Server error: ${err}`
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      done: false
    });

    res.status(201).json({ todo });
  } catch (err) {
    res.status(500).json({
      message: `Server error: ${err}`
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByPk(Number(req.params.id));
    todo.done = req.body.done;
    todo.save();
    res.status(200).json({ todo });
  } catch (err) {
    res.status(500).json({
      message: `Server error: ${err}`
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Просто пример как можно делать выборки из БД с фильтром
    const todos = await Todo.findAll({
      where: {
        id: Number(req.params.id)
      }
    });

    const todo = todos[0];
    await todo.destroy();
    res.status(204).json({});

  } catch (err) {
    res.status(500).json({
      message: `Server error: ${err}`
    });
  }
});

module.exports = router;
