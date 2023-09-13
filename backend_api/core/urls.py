from django.urls import path
from core.views import *

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('getinformation/<int:id>/', UserInformation.as_view(), name='getinformation'), 
    path('getresult/<int:id>/', ResultInfo.as_view() , name= 'getresult'), 
]
