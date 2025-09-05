from django.db import models

# Create your models here.
class Usuario(models.Model):

    GENERO_CHOICES = [
        ("M", "Masculino"),
        ("F", "Femenino"),
        ("O", "Otro")
    ]

    nombres = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    edad = models.IntegerField()
    genero = models.CharField(max_length=1, choices=GENERO_CHOICES)
    numeroTelefonico = models.CharField(max_length=50)
    contraseña = models.CharField(max_length=128)

    def __str__(self):
        return self.nombres