import { useParams } from "react-router-dom";
import HistoriqueList from "../components/HistoriqueList";

const EnfantDetails = () => {
  const { enfantId } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Détails de l'Enfant</h1>
      <HistoriqueList enfantId={enfantId} />
    </div>
  );
};

export default EnfantDetails;