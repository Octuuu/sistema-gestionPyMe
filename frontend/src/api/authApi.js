import axios from "axios";

const API_URL = "http://localhost:4000/api";  // Asegúrate de que esta URL sea correcta según tu servidor

// Función para registrar un nuevo usuario
export const registerUser = async ({ name, email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al registrar usuario");
  }
};

// Función para iniciar sesión
export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;  // Este debería devolver un token JWT en el cuerpo de la respuesta
  } catch (error) {
    throw new Error("Credenciales incorrectas");
  }
};

// Función para verificar si el usuario está autenticado (si tiene un token válido)
export const checkAuth = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;  // Retorna verdadero si el token existe
};

// Puedes agregar más funciones como logout, etc. según lo necesites
