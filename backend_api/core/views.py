from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from .serializers import (UserRegistrationSerializers, UserLoginSerializer, UserInformationSerializer, ResultSerializer, 
                        UserInfoSerializer, BlogSerializer, AnnouncementSerializer, EventSerializer, FeeSerializer, 
                        AdmissionFormSerializers, UserRequestSerializer)
from rest_framework.exceptions import ValidationError
from django.contrib.auth import authenticate
import json
from .models import (User, Result, SubGrade, Blog, Announcement, Event, 
                    Fee, Admission, AdmissionForm)
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
import datetime
from django.db.models import Q
from django.shortcuts import get_object_or_404

# Create your views here.

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class UserRegistrationView(APIView):

    def post(self, request):
        data = json.loads(request.body.decode('utf-8'))
        serializer = UserRegistrationSerializers(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            print(user.id)
            return Response({'msg': 'Registration Success', 'status': status.HTTP_201_CREATED,
                             'data': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UserLoginView(APIView):

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email=email, password=password)
            if user is not None:
                jwt_token = get_tokens_for_user(user)
                print(jwt_token['access'])
                user_data = User.objects.get(id=user.id)
                print(user_data.is_admin)
                if user_data.is_admin:
                    print("here")
                    return Response({'msg': 'Login Success of admin', 'status': status.HTTP_200_OK, 'id': user.id, 'auth_access': jwt_token['access'], 'admin':user_data.is_admin}, status=status.HTTP_200_OK)
                user_info = UserInfoSerializer(user_data)
                collected_info = False
                if user_info.data['gender'] is not None and user_info.data['division'] is not None and  user_info.data['Standards'] is not None:
                    collected_info = True
                return Response({'msg': 'Login Success', 'status': status.HTTP_200_OK, 'id': user.id, 'collected_info': collected_info, 'auth_access': jwt_token['access']}, status=status.HTTP_200_OK)
            else:
                try:
                    user_exists = User.objects.get(email=email)
                    if user_exists is not None:
                        return Response({'msg': 'Password is Wrong', 'status': status.HTTP_400_BAD_REQUEST})
                except:
                    return Response({'msg': "User not found", 'status': status.HTTP_404_NOT_FOUND}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'msg': {'non_field_errors': ['Email or Password is not valid']}},
                            status=status.HTTP_404_NOT_FOUND)
         

class UserInformation(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request):
        user = User.objects.get(id=request.user.id)
        print(user.division)
        serializer = UserInformationSerializer(instance=user, data=request.data, partial=True)
        print(serializer)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'msg': 'Success', 'status': status.HTTP_200_OK, 'id': user.id}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'error', 'status': status.HTTP_400_BAD_REQUEST},
                            status=status.HTTP_404_NOT_FOUND)


def grade_achieved(total):

    if total is not None:
            if total >= 90:
                return 'A1'
            elif 80 <= total < 90:
                return 'A2'
            elif 70 <= total < 80:
                return 'B1'
            elif 60 <= total < 70:
                return 'B2'
            elif 50 <= total < 60:
                return 'C1'
            elif 40 <= total < 50:
                return 'C2'
            elif 33 <= total < 40:
                return 'D'
            else:
                return 'E1'
    else:
        return None


class ResultInfo(APIView):

    permission_classes = [IsAuthenticated]
        
    def get(self, request):
        print(request.user)
        try:
            user = User.objects.get(id=request.user.id)
            user_info = UserInfoSerializer(user)
            print(user.id)
            result = Result.objects.get(student=user.id)
            result_data = SubGrade.objects.filter(student=result.id)
            serializer = ResultSerializer(data=result_data, many=True)
            total_mark = sum(subgrade.mark for subgrade in result_data)
            pass_fail = lambda total_mark, result_data: "Pass" if (total_mark / len(result_data)) > 33 else "Fail"
            result_in_word = pass_fail(total_mark, result_data)

            grade = grade_achieved(total_mark/len(result_data))
            if serializer.is_valid():
                serializer.save()
            return Response({'Result': serializer.data, 'Total_mark': total_mark, 'Grade': grade, 'User': user_info.data, 'pass_fail': result_in_word})
        except Result.DoesNotExist:
            user = User.objects.get(id=request.user.id)
            user_info = UserInfoSerializer(user)
            return Response({'User': user_info.data})


class GetBlog(APIView):
    
    def get(self, request):
        blog = Blog.objects.all()
        serializer = BlogSerializer(blog, many=True)
        return Response({'blog': serializer.data, 'status': status.HTTP_200_OK})
    

class AnnouncementInfo(APIView):

    def get(self, request):
        announcement = Announcement.objects.all()
        serializer = AnnouncementSerializer(announcement, many=True)
        return Response({'announcement': serializer.data, 'status': status.HTTP_200_OK})
    

class EventView(APIView):

    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many = True)
        return Response({'event': serializer.data, 'status': status.HTTP_200_OK})
   
    
class FeesView(APIView):

    def get(self, request):
        fees = Fee.objects.all()
        current_year = datetime.datetime.now().year
        admission = Admission.objects.get(admission_open_date__year=current_year)    
        serializer = FeeSerializer(fees, many=True)
        return Response({'fees': serializer.data, 'status': status.HTTP_200_OK, 'is_admission': admission.admission})


class AdmissionFormView(APIView):
    
    def get(self, request, format=None):
        data = AdmissionForm.objects.all()
        serializer = AdmissionFormSerializers(data, many=True)
        return Response({'data': serializer.data, "status":status.HTTP_200_OK})
    
    def post(self, request, format=None):
        data= request.data
        print(data)
        # data = json.loads(request.body.decode('utf-8'))
        serializer = AdmissionFormSerializers(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"data":serializer.data, "status":status.HTTP_201_CREATED}, status=status.HTTP_201_CREATED)
        if 'non_field_errors' in serializer.errors and len(serializer.errors['non_field_errors']) > 0:
            return Response({'detail': serializer.errors['non_field_errors'][0]}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class RequestApproveView(APIView):

    def get(self, request, id=None, role=None, format=None):
        if id is None and role is None:
            data = User.objects.filter(~Q(is_teacher=True) & ~Q(is_student=True))
            print(data)
            serializer = UserRequestSerializer(data, many=True)
            return Response({"data" : serializer.data}, status=status.HTTP_200_OK)
        elif id is None and role is not None:
            if role == 'teacher':
                data = User.objects.filter(is_teacher=True)
                serializer = UserRequestSerializer(data, many= True)
                return Response({"data" : serializer.data}, status=status.HTTP_200_OK)
            if role == 'student':
                data = User.objects.filter(is_student=True)
                serializer = UserRequestSerializer(data, many= True)
                return Response({"data" : serializer.data}, status=status.HTTP_200_OK)
        else:
            user = get_object_or_404(User, pk=id)
            if role == 'teacher':
                user.is_teacher = True
                user.save()
            if role == 'student':
                user.is_student = True
                user.save()
            serializer = UserRequestSerializer(user)
            return Response({"status": status.HTTP_200_OK}, status=status.HTTP_200_OK)



    

