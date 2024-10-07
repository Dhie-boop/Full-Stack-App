from django.urls import path
from .views import project_list, like_project, detailsproject
from .import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import *

urlpatterns = [
    #This is to display or render the entire list of the project created
    path('projects/', project_list, name='project_list'),
    
    #This endpoint API will show the like project and like options too 
    path('projects/<int:project_id>/like/', like_project, name='like_project'),
    
    #This endpoint API will render details of a particular project 
    path('projects/<int:project_id>/details/', detailsproject, name='project_details_api'),
    
    #This endpoint API will render the search of a particular project (search functionality but it is not working)
    path('project-search/', views.project_search, name='project_search'),
    
    #This endpoint API will create a new project
    path('projects/project_create/', views.project_create, name='project_create'),
    
    #This endpoint API will update a project
    path('projects/<int:project_id>/project_update', views.project_update, name='project_update'),
    
    #This endpoint API will delete a project
    path('projects/<int:project_id>/project_delete', views.project_delete, name='project_delete'),
    
    #This endpoint API will create a new project details
    path('project_details_create/', views.project_details_create, name='project_details_create'),
    
    #This endpoint API will update a project details
    path('project_details/<int:project_id>/project_details_update', views.project_details_update, name='project_details_update'),
    
    #This endpoint API will delete a project details
    #path('user_projects/', views.user_projects, name='user_projects'),	
    
    
    # This Endpoint to get all projects of the logged-in user
    path('user-projects/', views.user_projects, name='user_projects'),

    # This Endpoint to get the details of a specific project
    path('user-projects/<int:project_id>/', views.user_project_details, name='user_project_details'),
    
    
    
    
    # This Endpoint is for listing comments and creating a new comment for a project
    path('projects/<int:project_id>/comments/', views.project_comments, name='project_comments'),
    
    # This Endpoint is for updating and deleting a specific comment
    path('comments/<int:comment_id>/', views.modify_comment, name='modify_comment'),
    
    
    
    
    

    
    
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Other views
    path('register/', views.register, name='register'),
]