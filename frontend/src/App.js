import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import Notifications from "./pages/Notifications";
import {useTaskStore} from "./store/taskStore"
 

function ProtectedRoute({children}) {
  const isAuthenticated = useTaskStore((state)=> state.isAuthenticated)
  const token = localStorage.getItem("token")
  if(!isAuthenticated || ! token){

    return <Navigate to="/login"/>
  }
  return children
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        } />
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/tasks" />} />
      </Routes>
    </Router>
  );
}

export default App;
