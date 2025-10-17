import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axiosInstance from "../api/axios"
import { useTaskStore } from "../store/taskStore"
import { Mail, Lock, AlertCircle, Loader } from "lucide-react"

export default function Login() {
  const navigate = useNavigate()
  const setUser = useTaskStore((state) => state.setUser)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await axiosInstance.post("/auth/login", formData)
      const { token, user } = response.data.data

     
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      setUser(user)
      navigate("/tasks")
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de connexion")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-secondary flex items-center justify-center p-4 relative overflow-hidden">
    
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-500"></div>
      </div>

      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">Connexion</h1>
          <p className="text-neutral-600">Accédez à votre To-Do List</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 shadow-sm">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre@email.com"
                required
                className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200 bg-white/80"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full pl-12 pr-4 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200 bg-white/80"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-primary hover:shadow-lg hover:shadow-primary-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading && <Loader className="w-5 h-5 animate-spin" />}
            {isLoading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-neutral-600 text-sm">
            Pas encore de compte ?{" "}
            <Link 
              to="/register" 
              className="text-primary-600 hover:text-primary-700 font-semibold hover:underline transition-colors duration-200"
            >
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
