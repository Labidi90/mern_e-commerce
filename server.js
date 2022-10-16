const express = require("express");
const connectDB = require("./config/database");
const { config } = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const orderRoute = require("./routes/orderRoute");

const app = express();

// Connect to Database
connectDB();

// Init middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/products", productRoute);
app.use("/api/user", userRoute);
app.use("/api/orders", orderRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
