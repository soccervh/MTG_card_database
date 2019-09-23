from django.urls import path, include

import cards
from cards.api.urls import router

urlpatterns = [path('api/', include(cards.api.urls))]
