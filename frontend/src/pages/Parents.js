import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { fetchParents } from "../services/parentService";
import axios from "../api/axios";
import ParentForm from "../components/ParentForm";
import { Button } from "@/components/ui/button";
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

const Parents = () => {
  const queryClient = useQueryClient();
  const { data: parents, isLoading } = useQuery("parents", fetchParents);
  const [selectedParent, setSelectedParent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (parent) => {
    setSelectedParent(parent);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/parents/${id}/`);
      queryClient.invalidateQueries("parents"); // Rafraîchit la liste après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression du parent :", error);
    }
  };

  const handleSave = () => {
    setShowForm(false);
    setSelectedParent(null);
    queryClient.invalidateQueries("parents"); // Rafraîchit la liste après ajout/modification
  };

  if (isLoading) return <p>Chargement...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Gestion des Parents</h1>

      <Button onClick={() => setShowForm(true)} className="mb-4">
        Ajouter un parent
      </Button>

      {showForm && (
        <ParentForm
          parentToEdit={selectedParent}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setSelectedParent(null);
          }}
        />
      )}

      <Card>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Nom</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Téléphone</TableHeader>
                <TableHeader>Actions</TableHeader>
              </TableRow>
            </TableHead>
            <TableBody>
              {parents.map((parent) => (
                <TableRow key={parent.id}>
                  <TableCell>{parent.nom}</TableCell>
                  <TableCell>{parent.email}</TableCell>
                  <TableCell>{parent.telephone}</TableCell>
                  <TableCell>
                    <Button variant="outline" onClick={() => handleEdit(parent)} className="mr-2">
                      Modifier
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(parent.id)}>
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Parents;

