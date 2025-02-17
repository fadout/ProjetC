import React, { useEffect, useState } from 'react';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import api from '../api/api';

const ListeAttente = () => {
    const [enfants, setEnfants] = useState([]);

    useEffect(() => {
        api.get('/listes-attente/').then(response => {
            setEnfants(response.data);
        });
    }, []);

    const validerInscription = async (id) => {
        await api.put(`/enfants/${id}/`, { statut: 'Inscrit' });
        setEnfants(enfants.filter(e => e.id !== id));
    };

    return (
        <List>
            {enfants.map((enfant) => (
                <ListItem key={enfant.id}>
                    <ListItemText primary={`${enfant.nom} ${enfant.prenom}`} />
                    <Button variant="contained" onClick={() => validerInscription(enfant.id)}>Valider</Button>
                </ListItem>
            ))}
        </List>
    );
};

export default ListeAttente;