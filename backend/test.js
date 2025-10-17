import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:4000"; 
const USER_ID = "68f0fc3ff343d276ceb81a36";

const socket = io(SERVER_URL);

socket.on("connect", () => {
  console.log(" Connected to server with socket ID:", socket.id);

  socket.emit("user:connect", { userId: USER_ID });
});


socket.on("task:created", (data) => {
  console.log(" Notification received:", data);
});

socket.on("disconnect", () => {
  console.log("🔌 Disconnected from server");
});
