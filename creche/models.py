from django.db import models

# Create your models here.

class Enfant(models.Model):
    nom = models.CharField(max_length=255)
    date_naissance = models.DateField()
    statut = models.CharField(max_length=50, choices=[('Liste d’attente', 'Liste d’attente'), ('Inscrit', 'Inscrit')])
    date_inscription = models.DateField() 

    def __str__(self):
        return self.nom
    
class Parent(models.Model):
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    email = models.EmailField(unique=True)

    def __str__(self):
        return f"{self.prenom} {self.nom}"
    
class HistoriqueInscription(models.Model):
    enfant = models.ForeignKey("Enfant", on_delete=models.CASCADE, related_name="historique")
    action = models.CharField(max_length=255)  # Exemple : "Ajout", "Modification", "Suppression"
    date_action = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.enfant.nom} - {self.action} le {self.date_action.strftime('%d/%m/%Y')}"