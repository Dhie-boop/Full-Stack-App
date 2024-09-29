# API Endpoint Documentation

API Endpoint Documentation Contribution Guidelines
This documentation provides guidelines for integrating the API endpoints with React for your frontend development. The API is designed to manage project information, including creation, updating, deleting, and retrieving projects. The authentication endpoints for user registration and login are also covered.

## 1. Authentication Endpoints
   - User Registration ```/register/```
   - User Login ```/login/```
   - User Logout ```/UserLogoutView/```
## 2. Project Information Endpoints
  - Create Project ```/projects/project_create/```
  - List Projects ```/projects/```
  - Project Details ```/projects/<int:project_id>/details/```
  - Update Project ```/projects/<int:project_id>/project_update```
  - Delete Project ```/projects/<int:project_id>/project_delete```
## 3. User-Specific Project Endpoints
  - User Projects ```/user-projects/```
  - Specific User Project ```/user-projects/<int:project_id>/```


## 1. Authentication Endpoints
- User Registration ```/register/```
  Method: POST
Description: This endpoint allows the creation of a new user account. Users can register by submitting their information.





# 1. Authentication Endpoints
   - User Registration ```/register/```
Method: POST
Description: This endpoint allows the creation of a new user account. Users can register by submitting their information.
Request Body:

     ```
      {
        "username": "example_user",
        "password": "example_password",
        "email": "example@example.com"
      }
     ```
- Response:
      - Success: User is registered and an authentication token is generated.
      - Failure: Errors with invalid input.

  
- User Login (/login/)
      Method: POST
      Description: This endpoint allows users to log in and receive an authentication token.
      Request Body:

      ```
      {
        "username": "example_user",
        "password": "example_password"
      }
      ```
- Response:
      - Success: Token is returned upon successful login.
      - Failure: Login errors.


## User Logout (/UserLogoutView/)
Method: GET
Description: This endpoint logs out the authenticated user by invalidating the token.


# 2. Project Information Endpoints
Create Project (/projects/project_create/)
   Method: POST
   Description: Allows users to create a new project.
   Request Body:

      ```
      {
         "project_title": "New Project",
         "short_description": "Brief description of the project"
      }
      ```
- Response:
      - Success: Returns the created project data.
      - Failure: Validation errors.


## List Projects (/projects/)
   - Method: GET
   - Description: Retrieves a list of all available projects.
   - Query Parameters:
         - search: Search by project title.
         - category: Filter by category.
Response:
   Returns a list of projects that match the criteria.



## Project Details (/projects/<int:project_id>/details/)
   - Method: GET
   - Description: Fetches the details of a specific project.
   - Path Parameters:
      - project_id: The ID of the project to retrieve.
Response:
   Returns detailed information about the specified project.


## Update Project (/projects/<int:project_id>/project_update)
   Method: PUT
   Description: Updates the details of an existing project.
   
Request Body

      ```
      {
        "project_title": "Updated Project Title",
        "short_description": "Updated description"
      }
      ```
Response:
   - Success: Returns the updated project data.
   - Failure: Validation errors.


## Delete Project (/projects/<int:project_id>/project_delete)
   - Method: DELETE
   - Description: Deletes a specific project based on the project ID.

Response:
   Success: Confirmation of project deletion.


# 3. User-Specific Project Endpoints
   - User Projects (/user-projects/)
         - Method: GET
         - Description: Retrieves a list of projects created by the authenticated user.

Response:
   Returns a list of the user's projects.


## Specific User Project (/user-projects/<int:project_id>/)
   - Method: GET
   - Description: Fetches the details of a specific project created by the user.
   - Path Parameters:
        - project_id: The ID of the project.

Response:
   Returns detailed information about the user's project.



## Contribution Guidelines for React Integration
Authentication: Make sure to include the authentication token in the headers for endpoints that require user authentication.
Error Handling: Implement appropriate error handling in React for cases such as validation errors or failed requests.
