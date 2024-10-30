const mongoose = require("mongoose");
const { default: DatePicker } = require("react-datepicker");

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  description: {
    type: String,
    required: true,
  },
 
}, {
  timestamps: true
});


const Task = mongoose.model("Task", taskSchema);
module.exports = Task;