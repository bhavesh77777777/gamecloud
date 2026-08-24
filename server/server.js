import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.get("/", (req, res) => {
  res.send("GameCloud WebRTC signaling server is running.");
});

const rooms = new Map();

wss.on("connection", socket => {
  let roomId = null;

  socket.on("message", raw => {
    let message;

    try {
      message = JSON.parse(raw.toString());
    } catch {
      return;
    }

    if (message.type === "join") {
      roomId = String(message.room || "default");

      if (!rooms.has(roomId)) {
        rooms.set(roomId, new Set());
      }

      rooms.get(roomId).add(socket);

      socket.send(JSON.stringify({
        type: "joined",
        room: roomId
      }));

      return;
    }

    if (!roomId || !rooms.has(roomId)) return;

    for (const peer of rooms.get(roomId)) {
      if (peer !== socket && peer.readyState === 1) {
        peer.send(JSON.stringify(message));
      }
    }
  });

  socket.on("close", () => {
    if (!roomId || !rooms.has(roomId)) return;

    rooms.get(roomId).delete(socket);

    if (rooms.get(roomId).size === 0) {
      rooms.delete(roomId);
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`GameCloud signaling server listening on port ${PORT}`);
});
