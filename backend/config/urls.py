from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from kitchens.views import AdminKitchenViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register(r'admin/kitchens', AdminKitchenViewSet, basename='admin-kitchens')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]