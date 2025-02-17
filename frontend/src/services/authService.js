import api from "./api";

export const login = async (credentials) => {
  try {
    const response = await api.post("/token/", credentials);
    const tokens = response.data;
    localStorage.setItem("access", tokens.access);
    localStorage.setItem("refresh", tokens.refresh);
    return tokens;
  } catch (error) {
    console.error("Erreur lors de la connexion", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

export const getAccessToken = () => localStorage.getItem("access");