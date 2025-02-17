import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import { Pencil, Trash } from "lucide-react";

const ParentsTable = ({ onEdit }) => {
  const [parents, setParents] = useState([]);

  useEffect(() => {
    fetchParents();
  }, []);

  const fetchParents = async () => {
    try {
      const response = await axios.get("/parents/");
      setParents(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des parents :", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce parent ?")) {
      try {
        await axios.delete(`/parents/${id}/`);
        setParents(parents.filter((parent) => parent.id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
      }
    }
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Email</th>
          <th>Téléphone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {parents.map((parent) => (
          <tr key={parent.id}>
            <td>{parent.nom}</td>
            <td>{parent.email}</td>
            <td>{parent.telephone}</td>
            <td>
              <Button variant="outline" onClick={() => onEdit(parent)}>
                <Pencil size={16} />
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(parent.id)}>
                <Trash size={16} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ParentsTable;