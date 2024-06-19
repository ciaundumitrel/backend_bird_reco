from django.db import models

# Create your models here.

from django.db import models


class Family(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Genus(models.Model):
    name = models.CharField(max_length=100, unique=True)
    family = models.ForeignKey(Family, on_delete=models.CASCADE, related_name='genera')
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Species(models.Model):
    common_name = models.CharField(max_length=100)
    scientific_name = models.CharField(max_length=100, unique=True)
    genus = models.ForeignKey(Genus, on_delete=models.CASCADE, related_name='species')
    description = models.TextField(blank=True, null=True)
    habitat = models.CharField(max_length=200, blank=True, null=True)
    population_status = models.CharField(max_length=100, blank=True, null=True)
    image = models.CharField(max_length=128, blank=True, null=True)

    def __str__(self):
        return self.common_name


class Observation(models.Model):
    species = models.ForeignKey(Species, on_delete=models.CASCADE, related_name='observations')
    date = models.DateField()
    location = models.CharField(max_length=200)
    notes = models.TextField(blank=True, null=True)
    observer_name = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f'{self.species.common_name} observed on {self.date} at {self.location}'


class ConservationStatus(models.Model):
    species = models.OneToOneField(Species, on_delete=models.CASCADE, related_name='conservation_status')
    status = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    last_assessed = models.DateField()

    def __str__(self):
        return f'{self.species.common_name} - {self.status}'
