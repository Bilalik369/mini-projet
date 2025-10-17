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
      notifications: [{...notification, read: false}, ...state.notifications],
    })),

  clearNotifications: () => set({ notifications: [] }),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((notif) => notif.id !== id),
    })),

  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notif) => 
        notif.id === id ? {...notif, read: true} : notif
      ),
    })),

  markAllNotificationsAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((notif) => ({...notif, read: true})),
    })),

  getUnreadNotificationsCount: () => {
    const state = get()
    return state.notifications.filter(notif => !notif.read).length
  },


  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),


  fetchTasks: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.get("/tasks")
      set({ tasks: response.data.data.tasks || [], isLoading: false })
    } catch (error) {
      set({ error: error.response?.data?.message || "Erreur lors du chargement", isLoading: false })
    }
  },

  
  createTask: async (taskData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.post("/tasks", taskData)
      get().addTask(response.data.data.task)
      set({ isLoading: false })
      return response.data.data.task
    } catch (error) {
      set({ error: error.response?.data?.message || "Erreur lors de la création", isLoading: false })
      throw error
    }
  },


  updateTaskAPI: async (id, taskData) => {
    set({ isLoading: true, error: null })
    try {
      const response = await api.put(`/tasks/${id}`, taskData)
      get().updateTask(id, response.data.data.task)
      set({ isLoading: false })
      return response.data.data.task
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
