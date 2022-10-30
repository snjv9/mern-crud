let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
let employeeSchema = require("./model/Employee");

const username = encodeURIComponent("snjv9");
const password = encodeURIComponent("travel8355");
mongoose
  .connect(
    `mongodb+srv://${username}:${password}@cluster0.cw29j.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error: "));
// db.once("open", function () {
//   console.log("Connected successfully");
// });
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});
// CREATE
app.post("/create", async (req, res) => {
  const emp = new employeeSchema(req.body);
  try {
    await emp.save();
    res.status(201).json(emp);
  } catch (err) {
    res.status(500).send(err);
  }
});

// READ
app.get("/", async (req, res) => {
  try {
    const emp = await employeeSchema.find({});

    res.status(200).send(emp);
  } catch (error) {
    res.status(500).send(error);
  }
});

//READ BY ID
app.get("/view/:id", async (req, res) => {
  try {
    const emp = await employeeSchema.findOne({ _id: req.params.id });

    res.status(200).send(emp);
  } catch (error) {
    res.status(500).send(error);
  }
});

//UPDATE
app.put("/update/:id", async (req, res) => {
  try {
    const emp = await employeeSchema.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send(emp);
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE
app.delete("/delete/:id", async (req, res) => {
  try {
    await employeeSchema.findByIdAndRemove(req.params.id);
    res.status(200).json({ msg: data });
  } catch (err) {
    res.send(err);
  }
});
