import api from "./api";

export const fetchEnfants = async (filters = {}) => {
  const response = await api.get("/enfants/", { params: filters });
  return response.data;
};

export const createEnfant = async (data) => {
  const response = await api.post("/enfants/", data);
  return response.data;
};

export const updateEnfant = async (id, data) => {
  const response = await api.put(`/enfants/${id}/`, data);
  return response.data;
};

export const archiveEnfant = async (id) => {
  await api.delete(`/enfants/${id}/`);
};
