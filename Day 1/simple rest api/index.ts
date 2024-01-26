import http, { IncomingMessage, ServerResponse } from "http";

const PORT = 8000;
const server = http.createServer(
  async (req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req;
    console.log(method, url);

    if (method == "GET" && url == "/") {
      res.writeHead(200, { "Content-Type": "appliation/json" });
      res.write("Get Response GET");
      res.end();
    } else if (method == "POST" && url == "/") {
      res.writeHead(200, { "Content-Type": "appliation/json" });
      res.write("Get Response POST");
      res.end();
    } else if (method == "PUT" && url == "/") {
      res.writeHead(200, { "Content-Type": "appliation/json" });
      res.write("Get Response PUT");
      res.end();
    }
  }
);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
