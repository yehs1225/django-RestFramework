from xml.etree.ElementTree import Comment
from django.contrib.auth import get_user_model
from dataclasses import fields
from rest_framework import serializers
from .models import Post,Comment

User = get_user_model()

class OwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=(
            'id','username'
        )

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comment
        fields=(
            'id','title',
        )

class PostSerializer(serializers.ModelSerializer):
    owner = serializers.HyperlinkedIdentityField(many=False,view_name='owner-detail')
    comments = serializers.HyperlinkedRelatedField(queryset=Comment.objects.all(),many=True,view_name='comment-detail')
    #Meta class is a class of a class that defines how a class behaves
    class Meta:
        model = Post
        fields = (
            'title',
            'owner',
            'custom_id',
            'category',
            'publish_day',
            'last_update',
            'comments')