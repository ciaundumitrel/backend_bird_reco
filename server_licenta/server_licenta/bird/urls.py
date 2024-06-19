from django.urls import path
from .views import SpeciesList, AddEncounteredBirdView

urlpatterns = [
    path('', SpeciesList.as_view(), name='species-list'),
    path('add_encountered/', AddEncounteredBirdView.as_view(), name='add_encountered_bird'),

]
