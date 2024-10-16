# serializers.py
from dataclasses import fields
from rest_framework import serializers
from .models import ProjectInformation, ProjectDetails, ProjectComment, Like
from django.contrib.auth.hashers import make_password

from django.contrib.auth.models import User
from rest_framework import serializers

class ProjectInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectInformation
        fields = '__all__'  # This brings all the fields that belong to ProjectInformation model
        
class ProjectDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectDetails
        fields = ['project', 'school_category', 'status', 'github_link', 'description', 'image_sample', 'benefit']
        # Exclude author since we handle it in the view

    def create(self, validated_data):
        # Automatically assign the author in the view function, no need to pass it here
        return ProjectDetails.objects.create(**validated_data)  # This brings all the fields that belong to ProjectDetails model

class ProjectCommentSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = ProjectComment
        fields = ['id', 'user', 'comment_text', 'created_at']
    

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'  # This brings all the fields that belong to like model

class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = '__all__'








# This is the UserRegisterSerializer and UserLoginSerializer


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password']

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            username=validated_data['username'],
            password=make_password(validated_data['password']),
        )
        return user