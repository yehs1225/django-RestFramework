from rest_framework.generics import(
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    UpdateAPIView,
    DestroyAPIView
)
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.shortcuts import render
from .models import Author,Post
from .serializers import PostSerializer

def home(request):
    return render(request,'index.html')

class PostListView(ListAPIView):
    permission_classes=(AllowAny,)
    serializer_class = PostSerializer
    queryset = Post.objects.all()
