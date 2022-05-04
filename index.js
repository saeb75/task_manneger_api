const PORT = 3000;
const DB_URL = "mongodb://localhost:27017/TASK_MANAGER";
const Application = require("./app/server");
new Application(PORT, DB_URL);
