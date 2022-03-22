from sre_parse import CATEGORIES
from unicodedata import category
from django.db import models
from django.contrib.auth import get_user_model

#User model that is active
User = get_user_model()

CATEGORY_CHOICES = (
    ('DJ','Django'),
    ('RR','Ruby on Rails')
)

class Post(models.Model):
    owner = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    custom_id = models.IntegerField()
    category = models.CharField(max_length=3,choices=CATEGORY_CHOICES)
    publish_day = models.DateTimeField(auto_now_add=True)#update only when created
    last_update = models.DateTimeField(auto_now=True)#update when Model.save() is called.
    comments = models.ManyToManyField('Comment')

    def __str__(self):
        return self.title

class Comment(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title