from django.urls import path
from core.views import *
from .views import home

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
    path('admissionform/', AdmissionFormView.as_view(), name='admissionform'),
    path('admissionform/<int:id>/', AdmissionFormView.as_view(), name='admissionform'),
    path('admissionform/<str:info>/<int:id>/', AdmissionFormView.as_view(), name='admissionform'),
    path('requestapprove/', RequestApproveView.as_view(), name='requestapprove'),
    path('requestapprove/<int:id>/<str:role>/', RequestApproveView.as_view(), name='requestapprove'),
    path('requestapprove/<str:role>/', RequestApproveView.as_view(), name='requestapprove'),
    path('', home, name='captcha'),
    path('subject/', SubjectView.as_view(), name='subject'),
    path('subject/<str:std>/', SubjectView.as_view(), name='subject-std'),
    path('student/<str:std>/<str:div>/', StudentListView.as_view(), name='student'),
]
