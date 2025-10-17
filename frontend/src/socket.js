import { io } from "socket.io-client"
import { useTaskStore } from "./store/taskStore"

let socket = null

export const initializeSocket = () => {
  const token = localStorage.getItem("token")
  
  if (!token) {
    console.log("No token found, skipping socket connection")
    return
  }

  try {
    socket = io("http://localhost:4000", {
      auth: {
        token: token
      },
      transports: ["websocket", "polling"]
    })

    socket.on("connect", () => {
      console.log("Connected to server")
    })

    socket.on("disconnect", () => {
      console.log("Disconnected from server")
    })


    socket.emit('authenticate', localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null)

    socket.on("task:created", (data) => {
      console.log("Task created notification:", data)
      useTaskStore.getState().addTask(data.task)
      useTaskStore.getState().addNotification({
        id: Date.now(),
        message: data.message,
        type: data.type,
        task: data.task,
        timestamp: data.timestamp
      })
    })

    socket.on("task:updated", (data) => {
      console.log("Task updated notification:", data)
      useTaskStore.getState().updateTask(data.task._id, data.task)
      useTaskStore.getState().addNotification({
        id: Date.now(),
        message: data.message,
        type: data.type,
        task: data.task,
        timestamp: data.timestamp
      })
    })

    socket.on("task:deleted", (data) => {
      console.log("Task deleted notification:", data)
      useTaskStore.getState().deleteTask(data.task._id)
      useTaskStore.getState().addNotification({
        id: Date.now(),
        message: data.message,
        type: data.type,
        task: data.task,
        timestamp: data.timestamp
      })
    })

    socket.on("error", (error) => {
      console.error("Socket error:", error)
    })

  } catch (error) {
    console.error("Failed to initialize socket:", error)
  }
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
    console.log("Socket disconnected")
  }
}

export const getSocket = () => socket