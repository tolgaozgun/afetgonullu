from django.urls import path
from adminpanel.views import AddUserAPIView, EditUserAPIView

urlpatterns = [
    path('add-user/', AddUserAPIView.as_view(), name='add-user'),
    path('edit-user/<int:pk>/', EditUserAPIView.as_view(), name='edit-user'),
]