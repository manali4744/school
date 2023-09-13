from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializers, UserLoginSerializer, UserInformationSerializer, ResultSerializer, UserInfoSerializer
from rest_framework.exceptions import ValidationError
from django.contrib.auth import authenticate
import json
from .models import User, Result, SubGrade

# Create your views here.
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
            user_data = User.objects.get(id=user.id)
            user_info = UserInfoSerializer(user_data)
            if user_info.data['gender'] is not None and user_info.data['division'] is not None and  user_info.data['Standards'] is not None:
                collected_info = True
            if user is not None:
                return Response({'msg': 'Login Success', 'status': status.HTTP_200_OK, 'id': user.id, 'collected_info': collected_info}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': "User not found or password is mismatched"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': {'non_field_errors': ['Email or Password is not valid']}},
                            status=status.HTTP_404_NOT_FOUND)
        

class UserInformation(APIView):

    def put(self, request, id):
        user = User.objects.get(id=id)
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

    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
            user_info = UserInfoSerializer(user)
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
            user = User.objects.get(id=id)
            user_info = UserInfoSerializer(user)
            return Response({'User': user_info.data})