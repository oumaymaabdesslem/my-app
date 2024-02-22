import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import axios from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [errorsApi, setErrorsApi] = useState([])
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  // const login = async (data) => {
  //   setUser(data);
  //   navigate("/dashboard");
  // };
  // call this function when you want to authenticate the user
  const login = async (userData) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/login", userData);
      setUser(response.data); // Assuming the response contains user data

      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        // Handle validation errors
        const apiErrors = Array.isArray(error.response.data.message) ? error.response.data.message : [];
        setErrorsApi(apiErrors);

      } else {
        // Handle other errors
        console.error('Error during LOGIN:', error);
      }
    }
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      errorsApi,
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};