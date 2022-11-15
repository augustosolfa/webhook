import express from "express";
import bodyParser from "body-parser";

import Db from "./db.js";

const db = new Db();

const server = express();
server.use(bodyParser.json({ extended: true }));

server.get("/", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  db.getNotifications().then((response) => res.send(response));
  // const result = db.getNotifications();
  // console.log(result);
});

server.post("/webhook/*", function (req, res) {
  db.addNotification(req.params[0], req.body);
  res.json(req.body);
});

server.listen(3000, function () {
  console.log("App de Exemplo escutando na porta 3000!");
});
