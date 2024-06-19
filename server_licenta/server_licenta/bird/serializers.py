from rest_framework import serializers
from .models import Species


class SpeciesSerializer(serializers.ModelSerializer):
    encountered = serializers.SerializerMethodField()

    class Meta:
        model = Species
        fields = ['common_name', 'scientific_name', 'description', 'habitat', 'population_status', 'image',
                  'encountered']

    def get_encountered(self, obj):
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
            return obj in request.user.encountered_birds.all()
        return False


class AddEncounteredBirdSerializer(serializers.Serializer):
    species_id = serializers.PrimaryKeyRelatedField(queryset=Species.objects.all())

    def validate_species_id(self, value):
        if not Species.objects.filter(id=value.id).exists():
            raise serializers.ValidationError("Species does not exist.")
        return value