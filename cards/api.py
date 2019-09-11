from rest_framework import serializers, viewsets, routers

# Serializers define the API representation.
from cards.models import Card


class CardSerializer(serializers.HyperlinkedModelSerializer):
    spell_type = serializers.CharField(source='get_spell_type_display', )

    class Meta:
        model = Card
        fields = [
            'name', 'id', 'spell_type', 'abilities', 'text', 'flavor_text',
            'card_number', 'artist', 'slug', 'image', 'mana_green',
            'mana_white', 'mana_blue', 'mana_black', 'mana_red',
            'mana_colorless'
        ]


# ViewSets define the view behavior.
class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = Card.objects.all()
        cardname = self.request.query_params.get('name', None)
        if cardname is not None:
            queryset = queryset.search(cardname)
        return queryset


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'cards', CardViewSet)
