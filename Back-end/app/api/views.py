from django.shortcuts import render

# These are views for the api 
from django.contrib.auth.decorators import login_required
from rest_framework.authentication import SessionAuthentication
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from django.contrib.auth import login, logout
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import ProjectInformation, ProjectDetails, ProjectComment, Like, User
from .serializers import ProjectInformationSerializer, ProjectDetailsSerializer, ProjectCommentSerializer, LikeSerializer, UserSerializer
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics, permissions
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.middleware.csrf import get_token



# This is a API view function to create a project
@api_view(['POST'])
@permission_classes([AllowAny])
def project_create(request):
    if request.method == 'POST':
        serializer = ProjectInformationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#This views is to display project information and together the search functionalities and other things 

@api_view(['GET'])
@permission_classes([AllowAny])
def project_list(request):
    projects = ProjectInformation.objects.all()
    project_details = ProjectDetails.objects.all()

    # This get search and category filter values from the request
    search_query = request.GET.get('search')
    category_filter = request.GET.get('category')

    if search_query:
        projects = projects.filter(project_title__icontains=search_query)

    if category_filter:
        project_ids = ProjectDetails.objects.filter(school_category=category_filter).values_list('project_id', flat=True)
        projects = projects.filter(id__in=project_ids)

    # This add like information for each project
    project_data = []
    for project in projects:
        project_likes_count = Like.objects.filter(project=project).count()
        user_has_liked = Like.objects.filter(project=project, user=request.user).exists() if request.user.is_authenticated else False
        
        project_data.append({
            'id': project.id,
            'project_title': project.project_title,
            'short_description': project.short_description,
            'likes_count': project_likes_count,
            'user_has_liked': user_has_liked,
            
        })

    data = {
        'projects': project_data,
        'project_details': ProjectDetailsSerializer(project_details, many=True).data,
    }
    return Response(data, status=status.HTTP_200_OK)



# This API view function is to render the details of the particular project 

@api_view(['GET'])
@permission_classes([AllowAny])
def detailsproject(request, project_id):
    # Get the project or return 404 if not found
    project = get_object_or_404(ProjectInformation, id=project_id)
    project_details = ProjectDetails.objects.filter(project=project)

    # Create a list to hold project details and their related comments
    project_details_with_comments = []
    for detail in project_details:
        comments = detail.comments.all()  # Assuming you have a related comments field
        # Serialize the detail and the comments
        detail_serializer = ProjectDetailsSerializer(detail)
        comments_serializer = ProjectCommentSerializer(comments, many=True)
        # Append the serialized data to the list
        project_details_with_comments.append({
            'detail': detail_serializer.data,
            'comments': comments_serializer.data
        })

    # Serialize the main project using ProjectInformationSerializer
    project_serializer = ProjectInformationSerializer(project)

    # Return the project, its details, and related comments as JSON
    return Response({
        'project': project_serializer.data,
        'project_details_with_comments': project_details_with_comments
    }, status=status.HTTP_200_OK)

    
    
# This is a API view function of like 
@api_view(['POST'])
@permission_classes([AllowAny])
def like_project(request, project_id):
    # Get the project or return 404 if not found
    project = get_object_or_404(ProjectInformation, id=project_id)

    # Get or create a like for the project by the current user
    like, created = Like.objects.get_or_create(user=request.user, project=project)

    if not created:
        # If like already exists, delete it (user is unliking the project)
        like.delete()
        liked = False
    else:
        # If the like was created, the user liked the project
        liked = True

    # Count the total number of likes for the project
    likes_count = Like.objects.filter(project=project).count()

    # Return the liked status and total like count
    return Response({'liked': liked, 'likes_count': likes_count}, status=status.HTTP_200_OK)


# This is a API view function of search 
@api_view(['GET'])
@permission_classes([AllowAny])
def project_search(request):
    search_query = request.query_params.get('search', '') 
    category_filter = request.query_params.get('category', '')  

    # Retrieve all projects initially
    projects = ProjectInformation.objects.all()

    # Apply search query filter
    if search_query:
        projects = projects.filter(project_title__icontains=search_query)

    # Apply category filter if provided
    if category_filter:
        project_ids = ProjectDetails.objects.filter(school_category=category_filter).values_list('project_id', flat=True)
        projects = projects.filter(id__in=project_ids)

    # Serialize the project data
    project_list = projects.values('project_title', 'short_description')
    
    # Return the data in JSON format
    return Response({'results': list(project_list)}, status=status.HTTP_200_OK)



# This is a API view function to update a project
@api_view(['PUT'])
@permission_classes([AllowAny])
def project_update(request, project_id): 
    try:
        project = ProjectInformation.objects.get(pk=project_id) 
    except ProjectInformation.DoesNotExist:
        return Response({'error': 'Project not found.'}, status=status.HTTP_404_NOT_FOUND)

    project_serializer = ProjectInformationSerializer(project, data=request.data, partial=True)  # Initialize project_serializer

    if request.method == 'PUT':
        project_serializer = ProjectInformationSerializer(project, data=request.data)

        if project_serializer.is_valid():
            project_serializer.save()
            return Response({
                'message': 'Project updated successfully',
                'project': project_serializer.data,
            }, status=status.HTTP_200_OK)
        
        # If the data is invalid, return errors
        return Response(project_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({'error': 'Invalid request method.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)



    
    
    
    
# This is a API view function to delete a project
@api_view(['DELETE'])
def project_delete(request, project_id):
    # Get the ProjectInformation object
    project = get_object_or_404(ProjectInformation, id=project_id)

    # Check for DELETE request
    if request.method == 'DELETE':
        # Delete the related ProjectDetails first (assuming CASCADE delete is not set in the database)
        project_details = ProjectDetails.objects.filter(project=project)
        project_details.delete()

        # Then delete the ProjectInformation itself
        project.delete()
        
        return Response({'message': 'Project deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

    return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Change to IsAuthenticated for user assignment
def project_details_create(request):
    serializer = ProjectDetailsSerializer(data=request.data)
    if serializer.is_valid():
        # Save the instance and set the user
        project_details = serializer.save(user=request.user)  # Set the user from the request
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# This is a API view function to update a project details
@api_view(['PUT'])
def project_details_update(request, project_id):
    try:
        # Ensure you get the project detail with the correct project_id and author (user)
        project_detail = get_object_or_404(ProjectDetails, id=project_id, author=request.user)
    except ProjectDetails.DoesNotExist:
        return Response({'error': 'Project details not found.'}, status=status.HTTP_404_NOT_FOUND)

    # Initialize serializer with the request data for the specified instance
    serializer = ProjectDetailsSerializer(instance=project_detail, data=request.data)

    # Check if the data is valid before saving
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Project details updated successfully'}, status=status.HTTP_200_OK)
    
    # If validation fails, return the errors
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





# This is a API view function to get all the projects of the logged-in user
@api_view(['GET'])
@permission_classes([AllowAny])  
def user_projects(request):
    # Get all project details associated with the logged-in user
    project_details = ProjectDetails.objects.filter(user=request.user)

    # Extract the unique projects from the project details
    projects = [detail.project for detail in project_details]

    # Serialize the projects
    serializer = ProjectInformationSerializer(projects, many=True)  # Use the appropriate serializer

    return Response(serializer.data, status=status.HTTP_200_OK)  # Return the serialized data


@api_view(['GET'])
@permission_classes([AllowAny])
def user_project_details(request, project_id):
    # First, get the project using the `project_id`. This skips the direct user check.
    project = get_object_or_404(ProjectInformation, id=project_id)

    # Get all `ProjectDetails` entries related to this project. Assuming `ProjectDetails` has a `project` field.
    project_details_queryset = ProjectDetails.objects.filter(project=project).prefetch_related('comments')

    # Serialize the project information
    project_serializer = ProjectInformationSerializer(project)

    # Serialize the project details along with comments
    project_details_data = []
    for detail in project_details_queryset:
        detail_serializer = ProjectDetailsSerializer(detail)
        comments_serializer = ProjectCommentSerializer(detail.comments.all(), many=True)
        project_details_data.append({
            'detail': detail_serializer.data,
            'comments': comments_serializer.data
        })

    # Prepare the response data
    data = {
        'project': project_serializer.data,
        'project_details_with_comments': project_details_data
    }

    return Response(data, status=status.HTTP_200_OK)




@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def project_comments(request, project_id):
    # Try to retrieve the project using the project_id from the URL
    project = get_object_or_404(ProjectDetails, id=project_id)

    if request.method == 'POST':
        # Do not expect 'project_detail' in the request data, set it automatically
        data = request.data.copy()  # Copy the request data
        data['project_detail'] = project.id  # Set the 'project_detail' to the project ID
        
        # Create a comment with the modified data
        serializer = ProjectCommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save(user=request.user)  # Assign the authenticated user
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'GET':
        # Get all comments for this project
        comments = ProjectComment.objects.filter(project_detail=project)
        serializer = ProjectCommentSerializer(comments, many=True)
        return Response(serializer.data)


@api_view(['PUT', 'DELETE'])
@permission_classes([AllowAny])
def modify_comment(request, comment_id):
    # Retrieve the specific comment
    comment = get_object_or_404(ProjectComment, id=comment_id)

    # Check if the comment belongs to the authenticated user
    if comment.user != request.user:
        return Response({'error': 'You are not authorized to modify this comment.'}, status=status.HTTP_403_FORBIDDEN)

    # Update an existing comment
    if request.method == 'PUT':
        serializer = ProjectCommentSerializer(comment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete the comment
    elif request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)










@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt  
@api_view(['POST'])
@permission_classes([AllowAny])  
@authentication_classes([SessionAuthentication])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        login(request, user)  # This will create the session
        return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    
    
class LogoutView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)  # This will terminate the session
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
           
           



def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})
