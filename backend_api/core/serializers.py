from rest_framework import serializers
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth import authenticate
from .models import (User, SubGrade, Subject, Blog, Announcement, Event, Fee, 
                     AdmissionForm, Admission, class_subject)
import datetime

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

    def validate_name(self, value):
        """
        Custom validation for the 'name' field.
        Ensures that the 'name' field contains only characters (letters).
        """
        if not value.isalpha():
            raise serializers.ValidationError("Name should contain only letters (characters).")
        return value

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if len(password2) < 8:
            raise serializers.ValidationError("Length of password should be 8 characters or more")
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
    subject_name = serializers.CharField(required=True)
    class Meta:
        model = Subject
        fields = ['subject_name']
        extra_kwargs = {
            'subject_name': {'required': True},
        }

    def create(self, validated_data):
        existing_subject = Subject.objects.filter(**validated_data).first()
        if existing_subject:
            raise serializers.ValidationError("Subject already exists")
        return Subject.objects.create(**validated_data)


class ClasssubjectSerializer(serializers.ModelSerializer):
    subject = SubjectSerializer(many=True, read_only = True)
    class Meta:
        model = class_subject
        fields = "__all__"


class ResultSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source='subject_name.subject_name')
    class Meta:
        model = SubGrade
        fields = ['subject_name', 'mark']

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email', 'name', 'gender', 'division', 'Standards']


class UserRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        # fields = '__all__'
        exclude = ('password',)

class BlogSerializer(serializers.ModelSerializer):

    class Meta:
        model = Blog
        fields = '__all__'


class AnnouncementSerializer(serializers.ModelSerializer):

    class Meta:
        model = Announcement
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    coordinator = serializers.CharField(source='coordinator.email')
    co_coordinator = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields =  '__all__'

    def get_co_coordinator(self, obj):
        return [user.email for user in obj.co_coordinator.all()]
    

class FeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fee
        fields = '__all__'


class AdmissionFormSerializers(serializers.ModelSerializer):
    zipcode = serializers.IntegerField(
        validators=[
            MinValueValidator(100000, message="Enter a valid zipcode."),
            MaxValueValidator(999999, message="Enter a valid zipcode.")
        ]
    )
    phonenumber = serializers.IntegerField(
        validators=[
            MinValueValidator(1000000000, message="Enter valid phonenumber."),
            MaxValueValidator(9999999999, message="Enter valid phonenumber.")
        ]
    )
    is_accepted = serializers.BooleanField(default=False)
    is_pending = serializers.BooleanField(default=True)
    class Meta:
        model = AdmissionForm
        fields = ['id','firstName', 'lastName', 'father_name', 'mother_name', 'birthdate', 'gender', 'address', 'city', 
                  'country', 'zipcode', 'phonenumber', 'emailaddress', 'bloodgroup', 'studentphoto', 'is_accepted', 'is_pending']
        extra_kwargs = {
            'firstName': {'required': True},
            'lastName': {'required': True},
            'father_name': {'required': True},
            'mother_name': {'required': True},
            'birthdate': {'required': True},
            'gender': {'required': True},
            'address': {'required': True},
            'city': {'required': True},
            'country': {'required': True},
            'zipcode': {'required': True},
            'phonenumber': {'required': True},
            'emailaddress': {'required': True},
            'bloodgroup': {'required': True},
            'studentphoto': {'required': True},
        }

    
    def create(self, validated_data):

        # Get or create a matching admission record for the current year
        current_year = datetime.date.today().year
        matching_admission, _ = Admission.objects.get_or_create(
            admission_open_date__year=current_year,
            admission=True
        )
        
        # Set the admission_year field to the matching admission record
        validated_data['admission_year'] = matching_admission

        if AdmissionForm.objects.filter(
            firstName=validated_data['firstName'],
            father_name=validated_data['father_name'],
            lastName=validated_data['lastName'],
            emailaddress=validated_data['emailaddress']
        ).exists():
            # Raise a validation error with a custom message
            raise serializers.ValidationError({
                'non_field_errors': ["A record with the same combination of firstName, father_name, lastName, and emailaddress already exists."]
            })
        return AdmissionForm.objects.create(**validated_data)
