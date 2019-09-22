"""MTG_card_database URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth.models import User
from django.urls import path, include, re_path
from rest_framework import serializers, viewsets, routers

from cards.models import Card
from cards.views import (home_page, card_page, card_detail_page)

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', include('cards.urls')),
    path('cardSearch', home_page),
    # path('card/', card_page),
    # path('card_detail/<str:name>/', card_detail_page),
    # path('card_detail/', card_detail_page),
    path('admin/', admin.site.urls),
    path('', home_page),
    path('deck-builder/', home_page),
    path('cards', home_page),
    path('decks/', home_page),
    re_path(r'deck/*', home_page),
    re_path(r'card/.*', home_page),
    url(r'^api-auth/',
        include('rest_framework.urls', namespace='rest_framework'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
