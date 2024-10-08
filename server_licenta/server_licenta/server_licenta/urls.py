
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('custom_user.urls')),
    path('api/birds/', include('bird.urls')),
]
