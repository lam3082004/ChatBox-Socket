const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT || 3002;

// Express config
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, "./../../")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

io.on("connection", function (socket) {
  console.log("+1 connections !!!");
  socket.on("send message", (data) => {
    io.emit("send message", { data });
  });
  socket.on("disconnect", function () {
    console.log(socket.id + ": disconnected");
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

server.listen(port, (serverError) => {
  if (serverError) throw serverError;
  console.info(`App is running on ${port}`);
});