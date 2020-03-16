const express = require("express");
const app = express();
const PORT = 3001;
const path = require("path");
const todoRoutes = require("./routes/todo");
const sequelize = require("./utils/database");

app.use(express.json());
app.use("/api/todo", todoRoutes);

(async () => {
  try {
    await sequelize.sync({ force: true });
    app.listen(PORT, () => `Server is running on ${PORT}...`);
  } catch (err) {
    console.log("ERROR: ", err);
  }
})();
