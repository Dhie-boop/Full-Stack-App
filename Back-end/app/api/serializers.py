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
    class Meta:
        model = ProjectDetails
        fields = ['project', 'school_category', 'status', 'github_link', 'description', 'image_sample', 'benefit']
        # Exclude author since we handle it in the view

    def create(self, validated_data):
        # Automatically assign the author in the view function, no need to pass it here
        return ProjectDetails.objects.create(**validated_data)  # This brings all the fields that belong to ProjectDetails model

class ProjectCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectComment
        fields = ['id', 'project_detail', 'user', 'comment_text', 'created_at']
        read_only_fields = ['id', 'created_at', 'user']

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
