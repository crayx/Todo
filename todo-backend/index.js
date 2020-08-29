const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./models/");
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

function success(res, payload) {
  return res.status(200).json(payload);
}

app.get("/todos", async (req, res, next) => {
  try {
    const todos = await db.Todo.find({}).sort({ date: 1 });
    return success(res, todos);
  } catch (err) {
    next({ status: 400, message: "Failed to get todos" });
  }
});

app.post("/todos", async (req, res, next) => {
  try {
    const todo = await db.Todo.create(req.body);
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: "Failed to create todo" });
  }
});

app.put("/todos/:id", async (req, res, next) => {
  try {
    const todo = await db.Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return success(res, todo);
  } catch (err) {
    next({ status: 400, message: "Failed to update todo" });
  }
});

app.delete("/todos/:id", async (req, res, next) => {
  try {
    await db.Todo.findByIdAndRemove(req.params.id);
    return success(res, "todo deleted");
  } catch (err) {
    next({ status: 400, message: "Failed to delete todo" });
  }
});

app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing thr request",
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
