const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const { helper } = require("./modules/helprs");
const { allRoutes } = require("./routers/routes");

module.exports = class Application {
  constructor(PORT, DB_URL) {
    this.configDatabase(DB_URL);
    this.configApplication();
    this.createServer(PORT);
    this.createRoutes();
    this.errorHandler();
  }
  configDatabase(DB_URL) {
    mongoose.connect(DB_URL, (err) => {
      if (err) throw err;
      console.log("connected to database...");
    });
  }
  configApplication() {
    console.log(path.join(__dirname, "../public"));
    app.use(express.static(path.join(__dirname, "../public")));
    require("dotenv").config();
    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));
  }
  createServer(PORT) {
    require("http")
      .createServer(app)
      .listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
  }

  errorHandler() {
    app.use((req, res, next) => {
      return res.status(404).json({
        status: 404,
        message: "not found this",
      });
    });
    app.use((err, req, res, next) => {
      const status = err?.status || err?.code || 500;
      const message = err?.message || "Internal Server Error";
      return res.status(status).json({
        status,
        message,
        success: false,
      });
    });
  }
  createRoutes() {
    app.use(allRoutes);
  }
};
