from django.db import models
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.core.validators import EmailValidator, RegexValidator, MaxValueValidator, MinValueValidator
from django.apps import apps
from django.core.exceptions import ValidationError
import datetime

# Create your models here.
Division = (
    ('A', 'A'),
    ('B', 'B'),
    ('C', 'C'),
    ('D', 'D'),
)

class UserManager(BaseUserManager):
    def create_user(self,email, name, password=None, password2=None):

        user = self.model(
            email=self.normalize_email(email),
            name=name

        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,  email, name, password=None):
        user = self.create_user(
            email,
            name=name,
            password=password,
        )
        user.is_admin = True
        user.is_valid = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):

    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
        validators=[EmailValidator]
    )
    name = models.CharField(max_length=250, validators=[RegexValidator(regex='^[A-Za-z]{2,25}$', message="invalid name")])
   
    
    gender_choice = [
        ('Male','Male'),
        ('Female','Female'),
    ]
    gender = models.CharField(null=True,blank=True,choices=gender_choice,max_length=7)
    is_active = models.BooleanField(default=True)
    is_valid = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    is_student = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    division = models.CharField(choices=Division, max_length=255)
    Standards = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(12)], null=True, blank=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        # Simplest possible answer: Yes, always
        return True

    def get_all_permissions(self, user=None):
        if self.is_admin:
            return set()

    @property
    def is_staff(self):
        # Simplest possible answer: All admins are staff
        return self.is_admin

class Subject(models.Model):
    subject_name = models.CharField(max_length=225, unique=True)

    def __str__(self):
        return self.subject_name

class Result(models.Model):
    student = models.OneToOneField(User, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.student.name

    
class SubGrade(models.Model):
    student = models.ForeignKey(Result, on_delete=models.DO_NOTHING, null=True)
    GRADE = (
        ('A1', 'A1'),
        ('A2', 'A2'),
        ('B1', 'B1'),
        ('B2', 'B2'),
        ('C1', 'C1'),
        ('C2', 'C2'),
        ('D', 'D'),
        ('E1', 'E1'),
        ('E2', 'E2'),
    )
    subject_name = models.ForeignKey(Subject, on_delete=models.DO_NOTHING)
    mark = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)], default=0) 

    def __str__(self):
        return self.subject_name.subject_name  

class class_subject(models.Model):
    standard = models.IntegerField()
    subject = models.ManyToManyField(Subject)

    def __str__(self):
        return f"Class {self.standard}"
    

class Blog(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=4000, null=True, blank=True)
    blog_img = models.ImageField(null= True, blank= True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    

class Announcement(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateField()
    extra_info = models.CharField(max_length=255)

    def __str__(self):
        return self.title
    

class Event(models.Model):
    title = models.CharField(max_length=255)
    sub_title = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    description = models.CharField(max_length=4000)
    coordinator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='event_coordinator')
    co_coordinator = models.ManyToManyField(User)
    GD_Room = models.CharField(max_length=255)

    def __str__(self):
        return self.title
    
    def clean(self):
        if not self.coordinator.is_staff:
            raise ValidationError('Only admin users can be assigned as coordinators.')
        

class Fee(models.Model):
    standard = models.IntegerField(unique=True, validators=[MaxValueValidator(12), MinValueValidator(1)])
    academic_fee = models.IntegerField()
    lunch_fee = models.IntegerField()
    co_curricular_fee =models.IntegerField()
    transport_fee = models.IntegerField()

    def __str__(self):
        return self.standard.__str__()
    
    def calculate_total_fee(self):
    # Calculate the total fee by adding all fee components
        total_fee = self.academic_fee + self.lunch_fee + self.co_curricular_fee + self.transport_fee
        return total_fee
    

class Admission(models.Model):
    admission_open_date = models.DateField(null=False,blank=False)
    admission_close_date = models.DateField(null=False, blank=False)
    admission = models.BooleanField(default=True)
    
    def clean(self):
        # Check if there is already an admission entry for the current year
        current_year = self.admission_open_date.year
        existing_admission = Admission.objects.filter(admission_open_date__year=current_year)

        if self.pk:  # Exclude the current instance if it's being updated
            existing_admission = existing_admission.exclude(pk=self.pk)

        if existing_admission.exists():
            raise ValidationError('An admission entry for the current year already exists.')
        
    def __str__(self):
        return f"Year {self.admission_open_date.year}-{int(self.admission_open_date.year)+1}"
    

class AdmissionForm(models.Model):
    admission_year = models.ForeignKey(Admission, on_delete=models.PROTECT, default=None, blank=True, null=True)
    gender_choice = [
        ('Male','Male'),
        ('Female','Female'),
    ]
    firstName = models.CharField(null=False, blank=False)
    lastName = models.CharField(null=False, blank=False)
    father_name = models.CharField(null=False, blank=False)
    mother_name = models.CharField(null=False, blank=False)
    birthdate = models.DateField(null=False, blank=False)
    gender = models.CharField(choices=gender_choice)
    address = models.CharField(null=False, blank=False)
    city = models.CharField(null=False, blank=False)
    country = models.CharField(null=False, blank=False)
    zipcode = models.PositiveBigIntegerField(validators=[MinValueValidator(100000, message="Enter valid zipcode"), MaxValueValidator(999999, message="Enter valid zipcode")])
    phonenumber = models.PositiveBigIntegerField(validators=[MinValueValidator(1000000000, message="Enter valid phonenumber"), MaxValueValidator(9999999999, message="Enter valid phonenumber")])
    emailaddress = models.EmailField(null=True, blank=True)
    bloodgroup = models.CharField(null=True, blank=True)
    studentphoto = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.emailaddress
    
    class Meta:
        unique_together = ['firstName', 'father_name', 'lastName', 'emailaddress']

    def save(self, *args, **kwargs):

    # Check if admission is True and find a matching admission record for the current year
        if self.admission_year:
            current_year =  datetime.date.today().year
            print(current_year)
            matching_admission = Admission.objects.filter(
                admission_open_date__year=current_year,
                admission=True
            ).first()
            print(matching_admission)
            if matching_admission:
                self.admission_year = matching_admission

        super().save(*args, **kwargs)















    

