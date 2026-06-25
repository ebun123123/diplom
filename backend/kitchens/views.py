from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from .models import KitchenStyle
from .serializers import KitchenStyleSerializer

class AdminKitchenViewSet(viewsets.ModelViewSet):
    queryset = KitchenStyle.objects.all().order_by('-created_at')
    serializer_class = KitchenStyleSerializer
    permission_classes = [IsAdminUser]