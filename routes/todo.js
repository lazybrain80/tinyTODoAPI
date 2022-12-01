const express = require("express");
const router = express();

const { todoCtrl } = require("../controllers");

router.get("/", async (req, res) => {
  const { from, to } = req.query;

  try {
    res.send(await todoCtrl.between(from, to));
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.get("/oneday", async (req, res) => {
  const { at } = req.query;

  try {
    res.send(await todoCtrl.at(at));
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newTodo = req.body;
    res.send(await todoCtrl.create(newTodo));
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { content } = req.body;
    await todoCtrl.updateToDo(req.params.id, content);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.delete("/oneday", async (req, res) => {
  try {
    const { at } = req.query;
    await todoCtrl.removeByDay(at);
    res.status(200);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await todoCtrl.removeById(req.params.id);
    res.status(200);
  } catch (e) {
    res.status(400).json(e.message);
  }
});

module.exports = router;
