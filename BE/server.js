require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
//const morgan = require("morgan");
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    // const results = await db.query("SELECT * FROM restaurants");
    const results = await db.query(
      "select * from restaurants left join(select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id"
    );

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const results = await db.query(
      "select * from restaurants left join(select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1",
      [id]
    );

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1",
      [id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//create a restaurant
app.post("/api/v1/restaurants/", async (req, res) => {
  try {
    const name = req.body.name;
    const location = req.body.location;
    const price_range = req.body.price_range;
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
      [name, location, price_range]
    );
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const location = req.body.location;
    const price_range = req.body.price_range;
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [name, location, price_range, id]
    );
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const results = await db.query("DELETE FROM restaurants WHERE id = $1", [
      id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const id = req.params.id;
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) returning *;",
      [id, req.body.name, req.body.review, req.body.rating]
    );
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 3006;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
