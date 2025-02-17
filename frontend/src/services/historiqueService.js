import api from "./api";

export const fetchHistorique = async (enfantId) => {
  try {
    const response = await api.get(`/historique/`, { params: { enfant_id: enfantId } });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique", error);
    return [];
  }
};
