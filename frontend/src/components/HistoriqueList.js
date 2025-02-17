import { useEffect, useState } from "react";
import { fetchHistorique } from "../services/historiqueService";

const HistoriqueList = ({ enfantId }) => {
  const [historique, setHistorique] = useState([]);

  useEffect(() => {
    if (enfantId) {
      fetchHistorique(enfantId).then(setHistorique);
    }
  }, [enfantId]);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Historique des Inscriptions</h2>
      <ul>
        {historique.length > 0 ? (
          historique.map((entry) => (
            <li key={entry.id} className="border-b py-2">
              {entry.date_action} - {entry.action}
            </li>
          ))
        ) : (
          <p>Aucun historique disponible.</p>
        )}
      </ul>
    </div>
  );
};

export default HistoriqueList;