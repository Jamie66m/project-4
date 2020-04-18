from rest_framework import serializers

from django.contrib.auth import get_user_model
User = get_user_model()

from .models import GolfBag, UserCourseFavourites, UserCoursePlayed, UserGolfPhotos, UserCourseWishlist

import django.contrib.auth.password_validation as validations
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):

        password = data.pop('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError({'password_confirmation': 'Passwords do not match'})

        try:
            validations.validate_password(password=password)
        except ValidationError as err:
            raise serializers.ValidationError({'password': err.messages})

        data['password'] = make_password(password)
        return data

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirmation',)

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
      model = User
      fields = ('first_name', 'last_name', 'user_bio', 'handicap', 'profileimage', 'video_of_swing')


# class GolfBagSerializer(serializers.ModelSerializer):