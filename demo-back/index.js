const os = require("os");
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const pty = require("node-pty");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
  console.log("got connection");
  // init node-pty with an appropiate shell.
  // if the server is placed on a docker container we're guaranteed
  // to have a SHELL instance.
  const shell = process.env[os.platform() === "win32" ? "COMSPEC" : "SHELL"];
  const ptyProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 80,
    rows: 30,
    cwd: process.cwd(),
    env: process.env
  });

  //connection is up, let's add a simple simple event
  ws.on("message", message => {
    ptyProcess.write(message);
  });
  ptyProcess.on("data", data => ws.send(data));
});

//start our server
server.listen(process.env.PORT || 8999, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});
