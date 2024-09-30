# serializers.py
from rest_framework import serializers
from .models import ProjectInformation, ProjectDetails, ProjectComment, Like

from django.contrib.auth.models import User
from rest_framework import serializers

class ProjectInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectInformation
        fields = '__all__'  # This brings all the fields that belong to ProjectInformation model
        
class ProjectDetailsSerializer(serializers.ModelSerializer):
    # Access project_title from the related ProjectInformation model
    project_title = serializers.CharField(source='project.project_title', read_only=True)
    
    class Meta:
        model = ProjectDetails
        fields = ['project_title', 'author', 'school_category', 'status', 'github_link', 'description', 'image_sample', 'benefit']  # This brings all the fields that belong to ProjectDetails model

class ProjectCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectComment
        fields = '__all__'  # This brings all the fields that belong to ProjectComment model

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'  # This brings all the fields that belong to like model








# This is the UserRegisterSerializer and UserLoginSerializer


class UserRegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'confirm_password', 'email')

    def create(self, validated_data):
        validated_data.pop('confirm_password')  
        user = User(**validated_data)
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return attrs

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
