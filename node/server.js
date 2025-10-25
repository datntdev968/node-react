const express = require("express");
require("dotenv").config();
require("./config/dbconnect"); // Kết nối DB
const initRoutes = require("./routes"); // Để gọi routes

const app = express();
const port = process.env.PORT || 8888;
app.use(express.urlencoded({ extended: true })); // Middleware URL encoded
app.use(express.json()); // Middleware JSON
initRoutes(app); // Khởi tạo routes

app.listen(port, () => {
	console.log("Hello Server: " + port);
});
