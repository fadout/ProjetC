import { useQuery } from "react-query";
import { fetchHistorique } from "../services/historiqueService";

const HistoriqueModal = ({ enfant, onClose }) => {
  const { data: historique, isLoading } = useQuery(["historique", enfant.id], () => fetchHistorique(enfant.id));

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Historique de {enfant.nom}</h2>
        {isLoading ? <p>Chargement...</p> : (
          <ul>
            {historique.map((entry) => (
              <li key={entry.id}>{entry.action} - {entry.date_action}</li>
            ))}
          </ul>
        )}
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default HistoriqueModal;