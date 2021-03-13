const express = require("express");
const app = express();
const fs = require("fs");
const csv = require("fast-csv");
var ws = fs.createWriteStream("my.csv");
const Datastore = require("nedb");

app.listen(5000, () => console.log("listening at 5000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const arr = [];

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post("/api", (request, response) => {
  arr.push(request.body);
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});
