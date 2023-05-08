require("dotenv").config();
const express = require("express");
const db = require("./db");
//const morgan = require("morgan");
const app = express();

//middleware
app.use(express.json());
// app.use(morgan("tiny"));
// app.use((req, res, next) => {
//   console.log("middleware");
//   next();
// });

//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  const results = await db.query("SELECT * FROM restaurants");
  console.log(results);
  res.status(200).json({
    status: "success",
    data: {
      restaurants: ["McDonalds", "Wendys"],
    },
  });
});

//get a restaurant
app.get("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params);
});

//create a restaurant
app.post("/api/v1/restaurants/", (req, res) => {});

//update a restaurant
app.put("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params.id);
});

//delete a restaurant
app.delete("/api/v1/restaurants/:id", (req, res) => {
  console.log(req.params.id);
});

const port = process.env.PORT || 3006;
console.log(port);
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
