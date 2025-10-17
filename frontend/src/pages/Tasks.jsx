import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTaskStore } from "../store/taskStore"
import { initializeSocket, disconnectSocket } from "../socket"
import { 
  Plus, 
  Trash2, 
  Edit2, 
  CheckCircle, 
  Circle, 
  LogOut, 
  Bell, 
  Filter, 
  Search, 
  Calendar, 
  User,
  Clock,
  Flag
} from "lucide-react"

export default function Tasks() {
  const navigate = useNavigate()
  const { tasks = [], user, notifications = [], fetchTasks, createTask, updateTaskAPI, deleteTaskAPI, logout } = useTaskStore()
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskDescription, setNewTaskDescription] = useState("")
  const [newTaskPriority, setNewTaskPriority] = useState("medium")
  const [newTaskDueDate, setNewTaskDueDate] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")
  const [editPriority, setEditPriority] = useState("medium")
  const [editDueDate, setEditDueDate] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [filter, setFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    initializeSocket()
    fetchTasks()

    return () => {
      disconnectSocket()
    }
  }, [])

  const handleAddTask = async (e) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    setIsLoading(true)
    try {
      await createTask({
        title: newTaskTitle,
        description: newTaskDescription,
        priority: newTaskPriority,
        dueDate: newTaskDueDate || null,
        status: "pending"
      })
      setNewTaskTitle("")
      setNewTaskDescription("")
      setNewTaskPriority("medium")
      setNewTaskDueDate("")
      setShowAddForm(false)
    } catch (error) {
      console.error("Erreur lors de la création:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleComplete = async (task) => {
    try {
      const newStatus = task.status === "completed" ? "pending" : "completed"
      await updateTaskAPI(task._id, {
        ...task,
        status: newStatus,
      })
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error)
    }
  }

  const handleEditTask = (task) => {
    setEditingId(task._id)
    setEditTitle(task.title)
    setEditDescription(task.description)
    setEditPriority(task.priority)
    setEditDueDate(task.dueDate ? task.dueDate.split('T')[0] : "")
  }

  const handleSaveEdit = async () => {
    if (!editTitle.trim()) return

    try {
      await updateTaskAPI(editingId, {
        title: editTitle,
        description: editDescription,
        priority: editPriority,
        dueDate: editDueDate || null,
      })
      setEditingId(null)
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error)
    }
  }

  const handleDeleteTask = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche?")) {
      try {
        await deleteTaskAPI(id)
      } catch (error) {
        console.error("Erreur lors de la suppression:", error)
      }
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  
  const safeTasks = Array.isArray(tasks) ? tasks : []
  const safeNotifications = Array.isArray(notifications) ? notifications : []
  

  const unreadNotificationsCount = safeNotifications.filter(notif => !notif.read).length
  
  const filteredTasks = safeTasks.filter((task) => {
    const matchesStatus = 
      filter === "all" || 
      (filter === "completed" && task.status === "completed") || 
      (filter === "pending" && task.status === "pending") ||
      (filter === "in-progress" && task.status === "in-progress")
    
    const matchesPriority = 
      priorityFilter === "all" || task.priority === priorityFilter
    
    const matchesSearch = 
      task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesStatus && matchesPriority && matchesSearch
  })

  const completedCount = safeTasks.filter(task => task.status === "completed").length
  const pendingCount = safeTasks.filter(task => task.status === "pending").length
  const inProgressCount = safeTasks.filter(task => task.status === "in-progress").length

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-100"
      case "medium": return "text-yellow-600 bg-yellow-100"
      case "low": return "text-green-600 bg-green-100"
      default: return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "text-green-600"
      case "in-progress": return "text-blue-600"
      case "pending": return "text-gray-600"
      default: return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-secondary relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      </div>

     
      <header className="relative bg-white/90 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral-800">Ma To-Do List</h1>
                <p className="text-sm text-neutral-600">Gérez vos tâches efficacement</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-neutral-600">
                <User className="w-4 h-4" />
                <span>Bonjour, {user?.fullName || user?.name || "Utilisateur"}</span>
              </div>
              <button
                onClick={() => navigate("/notifications")}
                className="relative p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors duration-200"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg">
                    {unreadNotificationsCount > 99 ? '99+' : unreadNotificationsCount}
                  </span>
                )}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
   
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Total</p>
                <p className="text-3xl font-bold text-neutral-800">{safeTasks.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">Terminées</p>
                <p className="text-3xl font-bold text-secondary-600">{completedCount}</p>
              </div>
              <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-secondary-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">En cours</p>
                <p className="text-3xl font-bold text-blue-600">{inProgressCount}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">En attente</p>
                <p className="text-3xl font-bold text-accent-600">{pendingCount}</p>
              </div>
              <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center">
                <Circle className="w-6 h-6 text-accent-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
           
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Rechercher une tâche..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200"
                />
              </div>

              <div className="flex gap-2">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-neutral-400" />
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-4 py-2 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200 bg-white"
                  >
                    <option value="all">Tous statuts</option>
                    <option value="pending">En attente</option>
                    <option value="in-progress">En cours</option>
                    <option value="completed">Terminées</option>
                  </select>
                </div>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-4 py-2 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200 bg-white"
                >
                  <option value="all">Toutes priorités</option>
                  <option value="high">Haute</option>
                  <option value="medium">Moyenne</option>
                  <option value="low">Basse</option>
                </select>
              </div>
            </div>

           
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-5 h-5" />
              <span>Nouvelle tâche</span>
            </button>
          </div>

          
          {showAddForm && (
            <form onSubmit={handleAddTask} className="mt-6 p-6 bg-primary-50 rounded-xl border border-primary-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Titre de la tâche</label>
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Entrez le titre de la tâche..."
                    required
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Description (optionnelle)</label>
                  <textarea
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    placeholder="Ajoutez une description..."
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Priorité</label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200"
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Date d'échéance (optionnelle)</label>
                  <input
                    type="date"
                    value={newTaskDueDate}
                    onChange={(e) => setNewTaskDueDate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 rounded-xl transition-colors duration-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 disabled:opacity-50 transition-all duration-200"
                >
                  {isLoading ? "Ajout..." : "Ajouter"}
                </button>
              </div>
            </form>
          )}
        </div>

      
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-white/20 text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-600 mb-2">Aucune tâche trouvée</h3>
              <p className="text-neutral-500">
                {searchTerm ? "Aucune tâche ne correspond à votre recherche." : "Commencez par ajouter votre première tâche !"}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task._id}
                className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 transition-all duration-200 hover:shadow-xl ${
                  task.status === "completed" ? 'opacity-75' : ''
                }`}
              >
                {editingId === task._id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200 font-semibold"
                    />
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      rows={2}
                      className="w-full px-4 py-2 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200 resize-none"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select
                        value={editPriority}
                        onChange={(e) => setEditPriority(e.target.value)}
                        className="px-4 py-2 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200"
                      >
                        <option value="low">Basse</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Haute</option>
                      </select>
                      <input
                        type="date"
                        value={editDueDate}
                        onChange={(e) => setEditDueDate(e.target.value)}
                        className="px-4 py-2 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200"
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 text-neutral-600 hover:text-neutral-800 hover:bg-neutral-100 rounded-xl transition-colors duration-200"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="px-6 py-2 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200"
                      >
                        Sauvegarder
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start space-x-4">
                    <button
                      onClick={() => handleToggleComplete(task)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        task.status === "completed"
                          ? 'bg-secondary-500 border-secondary-500 text-white'
                          : 'border-neutral-300 hover:border-secondary-500'
                      }`}
                    >
                      {task.status === "completed" && <CheckCircle className="w-4 h-4" />}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`text-lg font-semibold transition-all duration-200 ${
                          task.status === "completed" ? 'text-neutral-500 line-through' : 'text-neutral-800'
                        }`}>
                          {task.title}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            <Flag className="w-3 h-3 inline mr-1" />
                            {task.priority === "high" ? "Haute" : task.priority === "medium" ? "Moyenne" : "Basse"}
                          </span>
                          <span className={`text-sm font-medium ${getStatusColor(task.status)}`}>
                            {task.status === "completed" ? "Terminée" : task.status === "in-progress" ? "En cours" : "En attente"}
                          </span>
                        </div>
                      </div>
                      
                      {task.description && (
                        <p className={`text-sm mt-1 transition-all duration-200 ${
                          task.status === "completed" ? 'text-neutral-400' : 'text-neutral-600'
                        }`}>
                          {task.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between mt-3">
                        <p className="text-xs text-neutral-400">
                          Créée le {task.createdAt ? new Date(task.createdAt).toLocaleDateString('fr-FR') : 'Date inconnue'}
                        </p>
                        {task.dueDate && (
                          <p className={`text-xs flex items-center ${
                            new Date(task.dueDate) < new Date() && task.status !== "completed" 
                              ? 'text-red-600' 
                              : 'text-neutral-500'
                          }`}>
                            <Calendar className="w-3 h-3 mr-1" />
                            Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="p-2 text-neutral-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors duration-200"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}