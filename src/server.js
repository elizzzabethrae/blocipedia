const app = require("./app");
const http = require("http");
const port = normalizePort(process.env.PORT || "3000");
const host = '0.0.0.0';
app.set("port", port);

const server = http.createServer(app);

server.listen(port);

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

// server.on("listening", () => {
//   console.log(`server is listening for requests on port ${server.address().port}`);
// });

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
