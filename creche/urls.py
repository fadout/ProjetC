from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EnfantViewSet, ParentViewSet, ListeAttenteViewSet, HistoriqueViewSet, UserViewSet, CustomTokenObtainPairView

router = DefaultRouter()
router.register(r'enfants', EnfantViewSet)
router.register(r'parents', ParentViewSet)
router.register(r'liste-attente', ListeAttenteViewSet, basename='listeattente')
router.register(r'historique', HistoriqueViewSet, basename='historique')
router.register(r'users', UserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path("", include(router.urls)),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
]