from django.urls import path
from . import views

urlpatterns = [
    path('get', views.get_data),
    path('add', views.add_data),
]

