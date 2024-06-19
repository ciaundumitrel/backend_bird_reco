from django.shortcuts import render

# Create your views here.
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Species
from .serializers import SpeciesSerializer, AddEncounteredBirdSerializer


class SpeciesList(generics.ListAPIView):
    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer


class AddEncounteredBirdView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = AddEncounteredBirdSerializer(data=request.data)
        name = request.data.get('species_name')
        bird_id = Species.objects.get(common_name__in=name)
        if serializer.is_valid():
            species = serializer.validated_data['species_id']
            user = request.user
            user.encountered_birds.add(species)
            return Response({'status': 'species added'}, status=status.HTTP_200_OK)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
