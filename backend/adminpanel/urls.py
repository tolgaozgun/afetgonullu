from django.urls import path
from adminpanel.views import AddUserAPIView, EditUserAPIView, LocationAdminList

urlpatterns = [
    path('add-user/', AddUserAPIView.as_view(), name='add-user'),
    path('edit-user/<int:pk>/', EditUserAPIView.as_view(), name='edit-user'),
    path('konumlar/', LocationAdminList.as_view(), name='konumlar'),
]