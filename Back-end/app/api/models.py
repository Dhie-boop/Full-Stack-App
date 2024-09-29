from django.db import models

# Create your models here.
from django.contrib.auth.models import User

class ProjectInformation(models.Model):
    project_title = models.CharField(max_length=255)
    short_description = models.TextField()
    image = models.ImageField(upload_to='project_images/', blank=True,)
    
    
    def __str__(self):
      return self.project_title

class ProjectDetails(models.Model):
    SCHOOL_CHOICES = [
        ('Science & Technology', 'School of Science & Technology'),
        ('Business', 'School of Business'),
        ('Education', 'School of Education'),
        ('Health Sciences', 'School of Health Sciences'),
        ('Natural Sciences', 'School of Natural Sciences'),
        ('Social Sciences', 'School of Social Sciences'),
        ('Theology & Religious Studies', 'School of Theology & Religious Studies'),
        ('Agriculture', 'School of Agriculture & Applied Sciences'),
    ]

    author = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(ProjectInformation, on_delete=models.CASCADE)
    school_category = models.CharField(max_length=255, choices=SCHOOL_CHOICES)
    status = models.CharField(max_length=50)
    github_link = models.URLField(blank=True)
    description = models.TextField()
    image_sample = models.ImageField(upload_to='project_images/', blank=True, default='default.png')
    benefit = models.TextField()

    def __str__(self):
     return self.school_category
     
class ProjectComment(models.Model):
    project_detail = models.ForeignKey(ProjectDetails, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    #def __str__(self):
        #return self.project_detail

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey(ProjectInformation, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'project')
    