import http from "node:http";
import { serveStatic } from "./utils/serveStatic.js";
import { handlePost, handlePrice } from "./handlers/routeHandler.js";

const PORT = 8000;

const baseDir = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  if (req.url === "/update") {
    return handlePrice(req, res);
  } else if (req.url === "/invest") {
    if (req.method === "POST") {
      return await handlePost(req, res);
    }
  } else if (!req.url.startsWith("/invest")) {
    return await serveStatic(req, res, baseDir);
  }
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
