import { create } from "zustand"
import api from "../api/axios"

export const useTaskStore = create((set, get) => ({
 
  tasks: [],
  notifications: [],
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

 
  setUser: (user) => set({ user, isAuthenticated: !!user }),

  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    set({ user: null, isAuthenticated: false, tasks: [], notifications: [] })
  },

 
  setTasks: (tasks) => set({ tasks }),

  addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),

  updateTask: (id, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task._id === id ? updatedTask : task)),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task._id !== id),
    })),


  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),

  clearNotifications: () => set({ notifications: [] }),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((notif) => notif.id !== id),
    })),


  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),


  fetchTasks: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get("/tasks")
      set({ tasks: response.data.data, isLoading: false })
    } catch (error) {
      set({ error: error.response?.data?.message || "Erreur lors du chargement", isLoading: false })
    }
  },

  
  createTask: async (taskData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.post("/tasks", taskData)
      get().addTask(response.data.data)
      set({ isLoading: false })
      return response.data.data
    } catch (error) {
      set({ error: error.response?.data?.message || "Erreur lors de la création", isLoading: false })
      throw error
    }
  },


  updateTaskAPI: async (id, taskData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.put(`/tasks/${id}`, taskData)
      get().updateTask(id, response.data.data)
      set({ isLoading: false })
      return response.data.data
    } catch (error) {
      set({ error: error.response?.data?.message || "Erreur lors de la mise à jour", isLoading: false })
      throw error
    }
  },

  
  deleteTaskAPI: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await api.delete(`/tasks/${id}`)
      get().deleteTask(id)
      set({ isLoading: false })
    } catch (error) {
      set({ error: error.response?.data?.message || "Erreur lors de la suppression", isLoading: false })
      throw error
    }
  },
}))
