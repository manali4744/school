from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import *



admin.site.register(Subject)
admin.site.register(class_subject)
admin.site.register(Blog)
admin.site.register(Event)
admin.site.register(Fee)
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email','name','gender','is_active','is_valid','is_admin','division')


class SubGradeInline(admin.TabularInline):
    model = SubGrade
    extra = 1

class ResultAdmin(admin.ModelAdmin):
    list_display = ['id', 'student', 'display_total']
    inlines = [SubGradeInline]

    def display_total(self, obj):
        marks = SubGrade.objects.filter(student=obj)
        total_marks = sum(mark.mark for mark in marks)
        return total_marks

admin.site.register(Result, ResultAdmin)
