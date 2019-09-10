from django.shortcuts import render, get_object_or_404
from .models import Card

# Create your views here.


def home_page(request):
    context = {"title": "MTG Card Database"}
    return render(request, 'home.html', context)


def card_page(request):
    context = {"title": "MTG Card Database"}
    return render(request, 'card.html', context)


def card_detail_page(request, name):
    obj = get_object_or_404(Card, name=name)
    template_name = 'card_detail.html'
    context = {"object": obj}
    return render(request, template_name, context)
