import io from "socket.io-client"
import { useTaskStore } from "./store/taskStore"

const SOCKET_URL = "http://localhost:5000"

let socket = null

export const initializeSocket = () => {
  if (socket) return socket

  socket = io(SOCKET_URL, {
    auth: {
      token: localStorage.getItem("token"),
    },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  })

 
  socket.on("connect", () => {
    console.log("[Socket] Connecté au serveur")
  })

  
  socket.on("disconnect", () => {
    console.log("[Socket] Déconnecté du serveur")
  })

  socket.on("task:created", (data) => {
    const store = useTaskStore.getState()
    store.addNotification({
      id: Date.now(),
      type: "success",
      message: `Nouvelle tâche créée: ${data.title}`,
      timestamp: new Date(),
    })
    store.addTask(data)
  })

  socket.on("task:updated", (data) => {
    const store = useTaskStore.getState()
    store.updateTask(data._id, data)
    store.addNotification({
      id: Date.now(),
      type: "info",
      message: `Tâche mise à jour: ${data.title}`,
      timestamp: new Date(),
    })
  })

  
  socket.on("task:deleted", (data) => {
    const store = useTaskStore.getState()
    store.deleteTask(data.id)
    store.addNotification({
      id: Date.now(),
      type: "warning",
      message: "Tâche supprimée",
      timestamp: new Date(),
    })
  })

 
  socket.on("error", (error) => {
    console.error("[Socket] Erreur:", error)
  })

  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export const getSocket = () => socket
