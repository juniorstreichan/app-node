"use strict";
const app = require("../src/app");
const debug = require("debug")("balta:server");
const http = require("http");
 
const port = normalizePort(process.env.PORT || "3000");
app.set('port',port);
 
const server = http.createServer(app);
 
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

console.log("Api rodando na porta " + port);

function onError(error) {
  if (error.syscall !== "listen") throw error;

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCESS":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);

      break;

    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);

      break;

    default:
      console.error(`ERROR:${error.code}`);

      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `Pipe ${addr}` : `Port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) return val;

  if (port >= 0) return port;

  return false;
}
