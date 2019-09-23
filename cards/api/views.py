from django.db.models import Q
from rest_framework import viewsets
from rest_framework.decorators import api_view

from cards.api.serializers import CardSerializer, DeckSerializer, ManaSerializer
from cards.models import Card, Deck, Mana, ManaForCard
from rest_framework.views import APIView, Response
from rest_framework.generics import CreateAPIView
from rest_framework import authentication, permissions
from rest_framework.parsers import MultiPartParser


class ManaViewSet(viewsets.ModelViewSet):
    queryset = Mana.objects.all()
    serializer_class = ManaSerializer
    lookup_field = 'name'


class DeckViewSet(viewsets.ModelViewSet):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer
    lookup_field = 'name'


# ViewSets define the view behavior.
class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        queryset = Card.objects.all()
        cardname = self.request.query_params.get('name', None)
        colorless = self.request.query_params.get('colorless', None)
        white = self.request.query_params.get('white', None)
        blue = self.request.query_params.get('blue', None)
        black = self.request.query_params.get('black', None)
        red = self.request.query_params.get('red', None)
        green = self.request.query_params.get('green', None)
        print(self.request.query_params)
        if cardname is not None:
            queryset = queryset.search(cardname)

        color_queryset = Q()
        if colorless is not None:
            color_queryset |= Q(mana__name='colorless')
        if white is not None:
            color_queryset |= (Q(mana__name__in=['white', 'bluewhite']))
        if blue is not None:
            color_queryset |= (Q(mana__name__in=['blue', 'bluewhite']))
        if black is not None:
            color_queryset |= Q(mana__name='black')
        if red is not None:
            color_queryset |= Q(mana__name='red')
        if green is not None:
            color_queryset |= Q(mana__name='green')
        return queryset.filter(color_queryset)


class CreateCard(CreateAPIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAdminUser]
    parser_classes = [MultiPartParser]

    def post(self, request, *args, **kwargs):
        c = Card()
        c.name = request.data.get('name')
        c.spell_type = request.data.get('spell_type')
        c.expansion = request.data.get('expansion')
        c.is_legendary = request.data.get('is_legendary') is 'true'
        c.card_number = request.data.get('card_number')
        c.creature_type = request.data.get('creature_type')
        c.abilities = request.data.get('abilities')
        c.text = request.data.get('text')
        c.flavor_text = request.data.get('flavor_text')
        c.power = request.data.get('power')
        c.defense = request.data.get('defense')
        c.loyalty = request.data.get('loyalty')
        c.artist = request.data.get('artist')
        c.save()
        c.image = request.data.get('file')
        for k, v in request.data.items():
            if k.startswith('mana_'):

                m = Mana.objects.get(name=k[5:])
                mfc = ManaForCard()
                mfc.mana = m
                mfc.card = c
                mfc.quantity = v
                mfc.save()
        c.save()
        return Response(self.serializer_class(c).data)


class UpdateCard(CreateAPIView):
    """
    View to list all users in the system.

    * Requires token authentication.
    * Only admin users are able to access this view.
    """
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAdminUser]

    def post(self, request, *args, **kwargs):
        c = Card.objects.get(pk=request.data.get('id'))
        c.name = request.data.get('name')
        c.spell_type = request.data.get('spell_type')
        c.expansion = request.data.get('expansion')
        c.is_legendary = request.data.get('is_legendary')
        c.card_number = request.data.get('card_number')
        c.creature_type = request.data.get('creature_type')
        c.abilities = request.data.get('abilities')
        c.text = request.data.get('text')
        c.flavor_text = request.data.get('flavor_text')
        c.power = request.data.get('power')
        c.defense = request.data.get('defense')
        c.loyalty = request.data.get('loyalty')
        c.artist = request.data.get('artist')
        mana = request.data.get('mana')
        ManaForCard.objects.filter(card=c).delete()
        c.save()
        for k, v in mana.items():
            m = Mana.objects.get(name=k)
            mfc = ManaForCard()
            mfc.mana = m
            mfc.card = c
            mfc.quantity = v
            mfc.save()
        c.save()
        return Response(self.serializer_class(c).data)
