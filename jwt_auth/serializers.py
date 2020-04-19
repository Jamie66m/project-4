from rest_framework import serializers

from django.contrib.auth import get_user_model
User = get_user_model()

from .models import GolfBag, UserCourseFavourites, UserCoursePlayed, UserGolfPhotos, UserCourseWishlist, CourseComment, UserHomeCourse

from golfcourses.serializers import CourseSerializer

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
      fields = ('id', 'first_name', 'last_name', 'user_bio', 'handicap', 'profileimage', 'video_of_swing')


class GolfBagSerializer(serializers.ModelSerializer):

    class Meta:
      model = GolfBag
      fields = ('id', 'putter', 'sw', 'pw', 'gw', 'lw', 'ulw', 'irons', 'woods', 'driver', 'user')

class UserGolfPhotosSerializer(serializers.ModelSerializer):

    class Meta:
      model = UserGolfPhotos
      fields = ('id', 'image', 'user')

class UserHomeCourseSerializer(serializers.ModelSerializer):

    course = CourseSerializer()
    user = UserSerializer()

    class Meta:

      model = UserHomeCourse
      fields = ('id', 'course', 'user')


class UserCoursePlayedSerializer(serializers.ModelSerializer):

    course = CourseSerializer(many=True)
    user = UserSerializer()

    class Meta:
      model = UserCoursePlayed
      fields = ('id', 'rating', 'score', 'time', 'course', 'user')

class UserCourseWishListSerializer(serializers.ModelSerializer):

    course = CourseSerializer(many=True)

    class Meta:
      model = UserCourseWishlist
      fields = ('id', 'course', 'user')

class UserCourseFavouritesSerializer(serializers.ModelSerializer):

    course = CourseSerializer(many=True)
    user = UserSerializer()

    class Meta:
      model = UserCourseFavourites
      fields = ('id', 'course', 'user')

class CourseCommentSerializer(serializers.ModelSerializer):

    course = CourseSerializer()

    class Meta:
      model = CourseComment
      fields = ('id', 'comment', 'created_at', 'course', 'user')