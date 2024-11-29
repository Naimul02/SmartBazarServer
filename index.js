const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

const productRoutes = require("./routes/productRoutes");
const { connectDB } = require("./utils/db");

app.use("/products", productRoutes);

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to SmartBazar API!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
