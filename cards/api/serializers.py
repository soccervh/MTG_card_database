from rest_framework import serializers

from cards.models import Mana, ManaForCard, Card, CardsInDeck, Deck


class ManaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mana
        fields = "__all__"


class ManaForCardSerializer(ManaSerializer):
    quantity = serializers.ReadOnlyField()
    mana = ManaSerializer()

    class Meta:
        model = ManaForCard
        fields = ['mana', 'quantity']


class CardSerializer(serializers.ModelSerializer):
    spell_type = serializers.CharField(source='get_spell_type_display', )
    mana = ManaForCardSerializer(many=True, source='manaforcard_set')

    class Meta:
        model = Card
        fields = "__all__"


class CardsInDeckSerializer(CardSerializer):
    quantity = serializers.ReadOnlyField()
    card = CardSerializer()

    class Meta:
        model = CardsInDeck
        fields = ['card', 'quantity']


class DeckSerializer(serializers.ModelSerializer):
    cards = CardsInDeckSerializer(many=True, source='cardsindeck_set')

    color = serializers.ReadOnlyField(source='get_color')

    class Meta:
        model = Deck
        fields = "__all__"
