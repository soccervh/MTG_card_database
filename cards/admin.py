from django.contrib import admin
from .models import Card
# Register your models here.


@admin.register(Card)
class CardAdmin(admin.ModelAdmin):
    def sluggy(self, obj):
        return obj.slug

    list_display = ('name', 'sluggy', 'mana_green', 'mana_white', 'mana_blue',
                    'mana_black', 'mana_red', 'mana_colorless')
    list_editable = ('mana_green', 'mana_white', 'mana_blue', 'mana_black',
                     'mana_red', 'mana_colorless')
    readonly_fields = ['slug']
