const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { generateResponse, history } = require("./controllers/index.js");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});


// 将请求体内容解析为JSON的中间件
app.use(bodyParser.json());

app.post("/generate", generateResponse);

app.get("/generate", (req, res) => {
    res.send(history);
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});