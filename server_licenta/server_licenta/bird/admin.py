from django.contrib import admin
from .models import Family, Genus, Species, Observation, ConservationStatus


@admin.register(Family)
class FamilyAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)


@admin.register(Genus)
class GenusAdmin(admin.ModelAdmin):
    list_display = ('name', 'family', 'description')
    search_fields = ('name',)
    list_filter = ('family',)


@admin.register(Species)
class SpeciesAdmin(admin.ModelAdmin):
    list_display = ('common_name', 'scientific_name', 'genus', 'habitat', 'population_status')
    search_fields = ('common_name', 'scientific_name')
    list_filter = ('genus', 'population_status')


@admin.register(Observation)
class ObservationAdmin(admin.ModelAdmin):
    list_display = ('species', 'date', 'location', 'observer_name')
    search_fields = ('species__common_name', 'location', 'observer_name')
    list_filter = ('species', 'date')


@admin.register(ConservationStatus)
class ConservationStatusAdmin(admin.ModelAdmin):
    list_display = ('species', 'status', 'last_assessed')
    search_fields = ('species__common_name', 'status')
    list_filter = ('status', 'last_assessed')
