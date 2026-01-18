const http = require("http");

const server = http.createServer((req, res) => {
	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("Hello World\n");
});

const express = require("express");
const app = express();

require("dotenv").config();

require("./config/express-middlewares").config(app);

const path = require("path");
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server started on ${port} port!`);
});
