const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config({ path: `${process.cwd()}/.env` });

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the API",
  });
});

app.use(express.json());

app.use(bodyParser.json());

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const eventRoutes = require("./routes/eventroutes");
app.use("/api/events", eventRoutes);

// app.use("*", (req, res, next) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
