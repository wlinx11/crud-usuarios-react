from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Usuario
from .serializer import UsuarioSerializer

import csv
from django.http import HttpResponse
from .models import Usuario

class UsuarioListCreateView(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

class UsuarioDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

def export_users_csv(request):
    response = HttpResponse(content_type="text/csv; charset=utf-8")
    response["Content-Disposition"] = 'attachment; filename="usuarios.csv"'

    # 👇 Usamos utf-8-sig para que Excel detecte bien los acentos
    writer = csv.writer(response, delimiter=',')
    response.write(u'\ufeff'.encode('utf8'))  # BOM para Excel

    writer.writerow(["ID", "Nombres", "Apellidos", "Edad", "Género", "Teléfono"])

    for u in Usuario.objects.all():
        writer.writerow([u.id, u.nombres, u.apellidos, u.edad, u.genero, u.numeroTelefonico])

    return response
