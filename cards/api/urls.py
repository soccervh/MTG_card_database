# Routers provide an easy way of automatically determining the URL conf.
from django.urls import include, path
from rest_framework import routers

import cards
from cards.api.serializers import CardSerializer
from cards.api.views import CardViewSet, DeckViewSet, ManaViewSet

router = routers.DefaultRouter()
router.register(r'cards', CardViewSet)
router.register(r'decks', DeckViewSet)
router.register(r'mana', ManaViewSet)

urlpatterns = [
    path('card-create',
         cards.api.views.CreateCard.as_view(serializer_class=CardSerializer)),
    path('card-update',
         cards.api.views.UpdateCard.as_view(serializer_class=CardSerializer)),
    path('', include(router.urls)),
]
