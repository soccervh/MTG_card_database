from django.shortcuts import render

# Create your views here.

def home_page(request):
    context = { "title": "MTG Card Database"}
    return render(request, 'home.html', context)

def card_page(request):
    context = { "title": "MTG Card Database"}
    return render(request, 'card.html', context)