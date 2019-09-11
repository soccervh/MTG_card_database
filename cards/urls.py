from django.urls import path, include

from cards.api import router

urlpatterns = [path('api/', include(router.urls))]
