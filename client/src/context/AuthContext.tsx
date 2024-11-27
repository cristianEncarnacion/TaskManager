// AuthContext.js
import { createContext, useState, useContext, useEffect } from "react";
import { isAxiosError } from "axios";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import { userProps } from "../types/user";
import Cookies from "js-cookie";

export const AuthContext = createContext({
  signup: async (user: userProps) => {},
  signin: async (user: userProps) => {},
  user: null as userProps | null,
  isAuthenticated: false,
  errors: null as string[] | null,
  loading: true,
  logout: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);

  const signup = async (user: userProps) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(false);
      setErrors(null); // Limpia cualquier error previo en caso de éxito
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const errorMessage =
          typeof error.response.data === "string"
            ? error.response.data
            : error.response.data || "An unexpected error occurred";
        setErrors([errorMessage]);
      } else {
        setErrors(["An unexpected error occurred"]); // Maneja errores no relacionados con Axios
      }
    }
  };

  const signin = async (user: userProps) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      setErrors(null); // Limpia cualquier error previo en caso de éxito
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const errorMessage =
          typeof error.response.data === "string"
            ? error.response.data
            : error.response.data || "An unexpected error occurred";
        setErrors([errorMessage]);
        console.log(error.response.data);
      } else {
        setErrors(["An unexpected error occurred"]);
      }
    }
  };

  // Limpia los errores después de 5 segundos
  useEffect(() => {
    if (errors && errors.length > 0) {
      const timer = setTimeout(() => setErrors(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Verifica el token en el primer render
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setUser(res.data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        setUser(null);
        setLoading(false);

        setIsAuthenticated(false);
        setErrors(["Token verification failed"]);
      }
    }

    checkLogin();
  }, []);

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ signup, signin, user, isAuthenticated, errors, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
