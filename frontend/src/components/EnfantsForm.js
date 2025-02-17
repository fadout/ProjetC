import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import api from '../api/api';

const EnfantForm = ({ onEnfantAdded }) => {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        date_naissance: '',
        statut: 'Liste d’attente'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/enfants/', formData);
        onEnfantAdded(); // Rafraîchir la liste
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField name="nom" label="Nom" onChange={handleChange} required />
            <TextField name="prenom" label="Prénom" onChange={handleChange} required />
            <TextField name="date_naissance" label="Date de naissance" type="date" onChange={handleChange} required />
            <Button type="submit" variant="contained" color="primary">Ajouter</Button>
        </form>
    );
};

export default EnfantForm;