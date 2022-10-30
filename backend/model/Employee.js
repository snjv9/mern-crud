const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let employeeSchema = new Schema(
  {
    emp_id: {
      type: Number,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    contact: {
      type: Number,
    },
  },
  {
    collection: "employeeList",
  }
);

module.exports = mongoose.model("employeeList", employeeSchema);
