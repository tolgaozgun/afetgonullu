from django.urls import path
from .views import ActivateView, LoginView, ForgotPasswordView, RegisterView

urlpatterns = [
    path('activate/<str:uidb64>/<str:token>', ActivateView.as_view(), name='activate'),
    path('login/', LoginView.as_view(), name='login'),
    path('forgot_password/', ForgotPasswordView.as_view(), name='forgot_password'),
    path('register/', RegisterView.as_view(), name='register'),
]