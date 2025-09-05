from django.urls import path
from .views import UsuarioDetailView, UsuarioListCreateView, export_users_csv

urlpatterns = [
    path('usuario/',UsuarioListCreateView.as_view(),
    name="usuario-list-create"),
    path('usuario/<int:pk>/',UsuarioDetailView.as_view(),
    name="usuario-detail"),
    path("usuario/export/", export_users_csv, name="usuario-export"),
]