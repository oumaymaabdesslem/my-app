// import './App.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './pages/Login/Login';
// import Register from './pages/Register/Register';
// import Dashboard from './Components/Dashboard/Dashboard';

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Dashboard />} />
//       <Route path="/login" element={<Login />} />
//     </Routes>

//   );
// }

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import { ProtectedRoute } from "./Auth/ProtectedRoutes";
import { AuthProvider } from "./hooks/useAuth";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>

  );
}

export default App;
