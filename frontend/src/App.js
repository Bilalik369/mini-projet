import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login";
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
        
      </Routes>
    </Router>
  );
}

export default App;
