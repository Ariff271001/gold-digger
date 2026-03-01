import http from "node:http";
import { serveStatic } from "./utils/serveStatic.js";

const PORT = 8000;

const baseDir = import.meta.dirname;

const server = http.createServer(async(req, res) => {
  if (!req.url.startsWith("/api")) {
    return await serveStatic(req,res,baseDir)
  }
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));
