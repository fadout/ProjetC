import React, { useState } from "react";
import EnfantTable from "../components/EnfantTable";
import EnfantForm from "../components/EnfantForm";
import ListeAttente from "../components/ListeAttente";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h1>Gestion des Enfants</h1>
      {/* Formulaire d'ajout d'enfant avec mise à jour automatique */}
      <EnfantForm onEnfantAdded={() => setRefresh(!refresh)} />
      
      {/* Tableau des enfants */}
      <EnfantTable key={refresh} />

      {/* Liste d'attente */}
      <ListeAttente />
    </div>
  );
};

export default Dashboard;