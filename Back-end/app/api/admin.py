from django.contrib import admin
from .models import ProjectInformation, ProjectDetails, ProjectComment, Like

class ProjectInformationAdmin(admin.ModelAdmin):
    list_display = ('project_title', 'short_description')
    search_fields = ('project_title',)

class ProjectDetailsAdmin(admin.ModelAdmin):
    list_display = ('user', 'project', 'school_category', 'status')
    search_fields = ('project__project_title', 'author__username')
    list_filter = ('school_category', 'status')

class ProjectCommentAdmin(admin.ModelAdmin):
    list_display = ('project_detail', 'user', 'created_at')
    search_fields = ('comment_text',)
    list_filter = ('created_at',)

class LikeAdmin(admin.ModelAdmin):
    list_display = ('user', 'project', 'created_at')
    list_filter = ('created_at',)

# Register your models with the admin interface
admin.site.register(ProjectInformation, ProjectInformationAdmin)
admin.site.register(ProjectDetails, ProjectDetailsAdmin)
admin.site.register(ProjectComment, ProjectCommentAdmin)
admin.site.register(Like, LikeAdmin)
