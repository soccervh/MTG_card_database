from django.contrib import admin
from .models import Card, CardsInDeck, Deck, Mana, ManaForCard

# Register your models here.


@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    def sluggy(self, obj):
        return obj.slug

    list_display = ('name', 'sluggy')

    readonly_fields = ['slug']


admin.site.register(CardsInDeck)
admin.site.register(Deck)
admin.site.register(Mana)
admin.site.register(ManaForCard)
