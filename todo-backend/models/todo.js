const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
  },
});
const todoModel = mongoose.model("Todo", todoSchema);
module.exports = todoModel;
