from django.shortcuts import render

# Create your views here.

from django.contrib.auth.models import User
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django_filters.rest_framework import DjangoFilterBackend
from .models import Enfant, Parent
from .serializers import EnfantSerializer, ParentSerializer, UserSerializer
from .models import HistoriqueInscription
from .serializers import HistoriqueInscriptionSerializer

class EnfantViewSet(viewsets.ModelViewSet):
    queryset = Enfant.objects.all()
    serializer_class = EnfantSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['statut', 'nom', 'date_inscription']
    
    def perform_create(self, serializer):
        enfant = serializer.save()
        HistoriqueInscription.objects.create(enfant=enfant, action="Ajout")
    
    def perform_update(self, serializer):
        instance = serializer.save()
        HistoriqueInscription.objects.create(enfant=instance, action="Modification")
    
    def perform_destroy(self, instance):
        HistoriqueInscription.objects.create(enfant=instance, action="Suppression")
        instance.statut = 'Archivé'
        instance.save(update_fields=['statut'])

class ParentViewSet(viewsets.ModelViewSet):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer
    permission_classes = [permissions.IsAuthenticated]

class ListeAttenteViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Enfant.objects.filter(statut='Liste d’attente').order_by('date_inscription')
    serializer_class = EnfantSerializer
    permission_classes = [permissions.IsAuthenticated]

class HistoriqueViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = EnfantSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        enfant_id = self.kwargs.get('pk')
        return Enfant.objects.filter(id=enfant_id)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    
    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]
    
class HistoriqueViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HistoriqueInscription.objects.all().order_by("-date_action")
    serializer_class = HistoriqueInscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        enfant_id = self.request.query_params.get("enfant_id")
        if enfant_id:
            return HistoriqueInscription.objects.filter(enfant_id=enfant_id).order_by("-date_action")
        return self.queryset
