import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTaskStore } from "../store/taskStore"
import { 
  ArrowLeft, 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Trash2, 
  Check,

  Clock
} from "lucide-react"

export default function Notifications() {
  const navigate = useNavigate()
  const { notifications = [], clearNotifications, removeNotification, markNotificationAsRead, markAllNotificationsAsRead } = useTaskStore()
  const [filter, setFilter] = useState("all") 

 
  const safeNotifications = Array.isArray(notifications) ? notifications : []

  const filteredNotifications = safeNotifications.filter((notification) => {
    if (filter === "all") return true
    if (filter === "unread") return !notification.read
    return notification.type === filter
  })

  const unreadCount = safeNotifications.filter(notif => !notif.read).length

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-red-600" />
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  const getNotificationBgColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "warning":
        return "bg-red-50 border-red-200"
      case "info":
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Date inconnue"
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    
    if (diffInMinutes < 1) return "À l'instant"
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`
    if (diffInMinutes < 1440) return `Il y a ${Math.floor(diffInMinutes / 60)} h`
    return date.toLocaleDateString('fr-FR')
  }

  const handleClearAll = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer toutes les notifications?")) {
      clearNotifications()
    }
  }

  const handleRemoveNotification = (id) => {
    removeNotification(id)
  }

  const handleMarkAsRead = (id) => {
    markNotificationAsRead(id)
  }

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead()
  }

  return (
    <div className="min-h-screen bg-gradient-secondary relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      
      <header className="relative bg-white/90 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <button
              onClick={() => navigate("/tasks")}
              className="flex items-center space-x-2 px-4 py-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors duration-200 mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour aux tâches</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neutral-800">Notifications</h1>
                <p className="text-sm text-neutral-600">
                  {safeNotifications.length} notification{safeNotifications.length !== 1 ? 's' : ''} 
                  {unreadCount > 0 && (
                    <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                      {unreadCount} non lue{unreadCount !== 1 ? 's' : ''}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {["all", "unread", "success", "info", "warning"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                    filter === f
                      ? "bg-primary-500 text-white shadow-lg"
                      : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50"
                  }`}
                >
                  {f === "all" ? "Toutes" : 
                   f === "unread" ? `Non lues (${unreadCount})` :
                   f === "success" ? "Succès" : 
                   f === "info" ? "Info" : "Alertes"}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors duration-200"
                >
                  <Check className="w-4 h-4" />
                  <span>Tout marquer comme lu</span>
                </button>
              )}
              
              {safeNotifications.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Tout supprimer</span>
                </button>
              )}
            </div>
          </div>
        </div>


        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-white/20 text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Bell className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-600 mb-2">
                {filter === "all" ? "Aucune notification" : `Aucune notification de type "${filter}"`}
              </h3>
              <p className="text-neutral-500">
                {filter === "all" 
                  ? "Vous n'avez aucune notification pour le moment."
                  : `Aucune notification de ce type n'a été trouvée.`
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border transition-all duration-200 hover:shadow-xl ${getNotificationBgColor(notification.type)} ${
                  !notification.read ? 'ring-2 ring-primary-200 border-primary-300' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className={`text-sm font-medium ${!notification.read ? 'text-neutral-900 font-semibold' : 'text-neutral-800'}`}>
                              {notification.message}
                            </p>
                            {!notification.read && (
                              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
                            )}
                          </div>
                        
                        {notification.task && (
                          <div className="bg-white/70 rounded-lg p-3 mt-2">
                            <p className="text-sm font-semibold text-neutral-700">
                              {notification.task.title}
                            </p>
                            {notification.task.description && (
                              <p className="text-xs text-neutral-600 mt-1">
                                {notification.task.description}
                              </p>
                            )}
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-4 mt-3">
                          <p className="text-xs text-neutral-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTimestamp(notification.timestamp)}
                          </p>
                          
                          {notification.type && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              notification.type === "success" ? "bg-green-100 text-green-800" :
                              notification.type === "warning" ? "bg-red-100 text-red-800" :
                              notification.type === "info" ? "bg-blue-100 text-blue-800" :
                              "bg-gray-100 text-gray-800"
                            }`}>
                              {notification.type === "success" ? "Succès" :
                               notification.type === "warning" ? "Alerte" :
                               notification.type === "info" ? "Information" : "Notification"}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        {!notification.read && (
                           <button
                             onClick={() => handleMarkAsRead(notification.id)}
                             className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
                             title="Marquer comme lu"
                           >
                             <Check className="w-4 h-4" />
                           </button>
                        )}
                        
                        <button
                          onClick={() => handleRemoveNotification(notification.id)}
                          className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200"
                          title="Supprimer cette notification"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

       
        {safeNotifications.length > 0 && (
          <div className="mt-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Résumé des notifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700">Succès</p>
                  <p className="text-lg font-bold text-green-600">
                    {safeNotifications.filter(n => n.type === "success").length}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Info className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700">Informations</p>
                  <p className="text-lg font-bold text-blue-600">
                    {safeNotifications.filter(n => n.type === "info").length}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-700">Alertes</p>
                  <p className="text-lg font-bold text-red-600">
                    {safeNotifications.filter(n => n.type === "warning").length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
