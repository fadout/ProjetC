import api from "./api";

export const fetchParents = async () => {
  const response = await api.get("/parents/");
  return response.data;
};