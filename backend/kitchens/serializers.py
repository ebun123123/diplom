from rest_framework import serializers
from .models import KitchenStyle

class KitchenStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = KitchenStyle
        fields = '__all__'