from django.contrib import admin
from django.urls import path,include
from posts.views import (
    PostListView,PostDetailView,PostDestroyView,
    OwnerDetailView,CommentDetailView
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/',include('rest_framework.urls')),
    path('api/',include('posts.urls')),
    # path('api/posts/',PostListView.as_view(),name='post-list'),
    # path('api/posts/<int:pk>/',PostDetailView.as_view(),name='post-detail'),
    # path('api/posts/<int:pk>/delete',PostDestroyView.as_view(),name='post-delete'),
    path('api/owner/<int:pk>/',OwnerDetailView.as_view(),name='owner-detail'),
    path('api/comment/<int:pk>/',CommentDetailView.as_view(),name='comment-detail'),
    # path('api/posts/<int:pk>/',PostView.as_view(),name='post-detail'),
]
