# API Endpoint Documentation

API Endpoint Documentation Contribution Guidelines
This documentation provides guidelines for integrating the API endpoints with React for your frontend development. The API is designed to manage project information, including creation, updating, deleting, and retrieving projects. The authentication endpoints for user registration and login are also covered.

## 1. Authentication Endpoints
  User Registration (/register/)
  User Login (/login/)
  User Logout (/UserLogoutView/)
## 2. Project Information Endpoints
  Create Project (/projects/project_create/)
  List Projects (/projects/)
  Project Details (/projects/<int:project_id>/details/)
  Update Project (/projects/<int:project_id>/project_update)
  Delete Project (/projects/<int:project_id>/project_delete)
## 3. User-Specific Project Endpoints
  User Projects (/user-projects/)
  Specific User Project (/user-projects/<int:project_id>/)


# 1. Authentication Endpoints
User Registration (/register/)
Method: POST
Description: This endpoint allows the creation of a new user account. Users can register by submitting their information.
