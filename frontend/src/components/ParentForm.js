import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

const ParentForm = ({ parentToEdit, onSave, onCancel }) => {
  const [parent, setParent] = useState({
    nom: "",
    email: "",
    telephone: "",
  });

  useEffect(() => {
    if (parentToEdit) {
      setParent(parentToEdit);
    }
  }, [parentToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParent({ ...parent, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (parent.id) {
        await axios.put(`/parents/${parent.id}/`, parent);
      } else {
        await axios.post("/parents/", parent);
      }
      onSave();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du parent :", error);
    }
  };

  return (
    <Card className="p-4 w-full max-w-md">
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label>Nom</Label>
            <Input type="text" name="nom" value={parent.nom} onChange={handleChange} required />
          </div>
          <div>
            <Label>Email</Label>
            <Input type="email" name="email" value={parent.email} onChange={handleChange} required />
          </div>
          <div>
            <Label>Téléphone</Label>
            <Input type="tel" name="telephone" value={parent.telephone} onChange={handleChange} required />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ParentForm;