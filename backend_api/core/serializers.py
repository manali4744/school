from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, SubGrade, Subject, Blog, Announcement

class UserRegistrationSerializers(serializers.ModelSerializer):
    # card_details = AddcardSerializer(many=True,read_only=True)
    password2 = serializers.CharField(style={'input_style': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'name', 'password', 'password2']
        # fielids = ['email', 'is_verified']
        # REQUIRED_FIELDS = ['phone']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password does not match")
        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        model = User
        fields = ['email', 'password']


class UserInformationSerializer(serializers.ModelSerializer):
    GENDER = [
        ('Male','Male'),
        ('Female','Female'),
    ]
    gender = serializers.ChoiceField(choices= GENDER, required=True)
    Standards = serializers.IntegerField()
    class Meta:
        model = User
        fields = ['gender', 'division', 'Standards']
        REQUIRED_FIELDS = ['gender', 'division', 'Standards']

    def update(self, instance, validated_data):
        instance.division = validated_data.get('division', instance.division)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.Standards = validated_data.get('Standards', instance.Standards)
        instance.save()
        return instance
    

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['subject_name']


class ResultSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source='subject_name.subject_name')
    class Meta:
        model = SubGrade
        fields = ['subject_name', 'mark']

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'name', 'gender', 'division', 'Standards']

class BlogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Blog
        fields = '__all__'


class AnnouncementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Announcement
        fields = '__all__'