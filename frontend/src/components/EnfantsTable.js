import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchEnfants } from "../services/enfantService";
import HistoriqueModal from "./HistoriqueModal";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem } from "@mui/material";

const EnfantsTable = () => {
  const { data: enfants = [], isLoading } = useQuery("enfants", fetchEnfants); // Récupération des enfants avec React Query
  const [search, setSearch] = useState("");
  const [statutFilter, setStatutFilter] = useState("");
  const [selectedEnfant, setSelectedEnfant] = useState(null); // Gestion du modal d'historique

  if (isLoading) return <p>Chargement...</p>;

  // Filtrage des enfants
  const filteredEnfants = enfants.filter(e => 
    e.nom.toLowerCase().includes(search.toLowerCase()) && 
    (statutFilter === "" || e.statut === statutFilter)
  );

  return (
    <div>
      {/* Barre de recherche et filtre */}
      <TextField label="Rechercher" variant="outlined" onChange={(e) => setSearch(e.target.value)} />
      <Select value={statutFilter} onChange={(e) => setStatutFilter(e.target.value)}>
        <MenuItem value="">Tous</MenuItem>
        <MenuItem value="Inscrit">Inscrit</MenuItem>
        <MenuItem value="Liste d’attente">Liste d’attente</MenuItem>
      </Select>

      {/* Tableau des enfants */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Prénom</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell>Date d'inscription</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEnfants.map((enfant) => (
              <TableRow key={enfant.id}>
                <TableCell>{enfant.nom}</TableCell>
                <TableCell>{enfant.prenom}</TableCell>
                <TableCell>{enfant.statut}</TableCell>
                <TableCell>{enfant.date_inscription}</TableCell>
                <TableCell>
                  <button onClick={() => setSelectedEnfant(enfant)}>Historique</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal d'historique */}
      {selectedEnfant && <HistoriqueModal enfant={selectedEnfant} onClose={() => setSelectedEnfant(null)} />}
    </div>
  );
};

export default EnfantsTable;
