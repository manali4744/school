from django.urls import path
from core.views import *

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('getinformation/', UserInformation.as_view(), name='getinformation'), 
    path('getresult/', ResultInfo.as_view() , name= 'getresult'), 
    path('getblog/', GetBlog.as_view(), name= 'getblog'),
    path('announcement/', AnnouncementInfo.as_view(), name='announcement'),
    path('event/', EventView.as_view(), name='event'),
    path('fees/', FeesView.as_view(), name='fees'),
    path('admissionform/', AdmissionForm.as_view(), name="admissionform")
]
