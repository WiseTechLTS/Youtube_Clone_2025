from rest_framework import serializers
from .models import Comment
from authentication.models import User


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['id', 'video_id', 'text', 'likes', 'dislikes', 'user']
        depth = 1
