// import { io } from "socket.io-client";

// const socket = io("http://localhost:5050");

// socket.on("connect", () => {
//   console.log("Client A connected");


//   socket.emit("join-channel", { channelId: "1" });
// });

// socket.on("joined-channel", (roomName) => {
//   console.log("A joined:", roomName);

//   // send messages after join
//   setInterval(() => {
//     socket.emit("channel-message", {
//       channelId: "1",
//       message: "Hello from A"
//     });
//   }, 1000);
// });

// socket.on("channel-message", (data) => {
//   console.log("A received:", data);
// });
import { io } from "socket.io-client";

const socket = io("http://localhost:5050", {
    auth: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NDZhYzAzNTk1YTQ1NGEwY2Q3MDBlNCIsImlhdCI6MTc2ODIyNjk4MiwiZXhwIjoxNzY4ODMxNzgyfQ.anLld6mEk7rnLr-S603ZMMs1tpF81znQdb6cKKSUP90"
    }
});

socket.on("connect", () => {
  console.log("Connected to server:", socket.id);

  // STEP 3.1 — Join a channel
  socket.emit("join-channel", {
    channelId: "6965011079c79b6ea97174d6"
  });
});

// STEP 3.2 — Receive history
socket.on("channel-history", (messages) => {
  console.log("Message history:");
  console.log(messages);
});

// STEP 3.3 — Receive new messages
socket.on("new-message", (message) => {
  console.log("New message:", message);
});

// STEP 3.4 — Send a message every 3s
setInterval(() => {
  socket.emit("send-message", {
    channelId: "6965011079c79b6ea97174d6",
    content: "Hello from test client",
    userId: "6946ac03595a454a0cd700e4"
  });
}, 3000);

// STEP 3.5 — Errors
socket.on("socket-error", (err) => {
  console.error("Socket error:", err);
});
