from rest_framework import serializers
from .models import HistoriqueInscription

class HistoriqueInscriptionSerializer(serializers.ModelSerializer):
    enfant_nom = serializers.CharField(source="enfant.nom", read_only=True)

    class Meta:
        model = HistoriqueInscription
        fields = ["id", "enfant", "enfant_nom", "action", "date_action"]

class EnfantSerializer(serializers.Serializer):
    pass  # Ajoute tes champs ici

class ParentSerializer(serializers.Serializer):
    pass

class UserSerializer(serializers.Serializer):
    pass