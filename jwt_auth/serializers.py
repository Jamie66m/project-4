from rest_framework import serializers, fields

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

    def validate_username(self, value):
      if not value:
        raise serializers.ValidationError(
            'A username is required to register.'
        )
      return value

    def validate_email(self, value):
      if not value:
        raise serializers.ValidationError(
            'An email address is required to register.'
        )
      return value

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirmation')


class GolfBagSerializer(serializers.ModelSerializer):

    class Meta:
      model = GolfBag
      fields = ('id', 'putter', 'sw', 'pw', 'gw', 'lw', 'ulw', 'irons', 'woods', 'driver', 'user')

class UserGolfPhotosSerializer(serializers.ModelSerializer):

    class Meta:
      model = UserGolfPhotos
      fields = ('id', 'image', 'user')

class UserHomeCourseSerializer(serializers.ModelSerializer):
    
    class Meta:

      model = UserHomeCourse
      fields = ('id', 'course', 'user')

class UserCoursePlayedSerializer(serializers.ModelSerializer):

    # course = CourseSerializer(read_only=True)
    # user = UserSerializer()
    time = fields.DateField(input_formats=['%Y-%m-%d'])

    class Meta:
      model = UserCoursePlayed
      fields = ('id', 'rating', 'score', 'time', 'course', 'user')

class UserCoursePlayedReadSerializer(UserCoursePlayedSerializer):
    course = CourseSerializer(many=True)
    user = UserSerializer(read_only=True)

class UserCourseWishListSerializer(serializers.ModelSerializer):

    class Meta:
      model = UserCourseWishlist
      fields = ('id', 'course', 'user')
      
class UserCourseWishlistReadSerializer(UserCourseWishListSerializer):
    course = CourseSerializer(many=True)
    user = UserSerializer(read_only=True)

class UserCourseFavouritesSerializer(serializers.ModelSerializer):

    class Meta:
      model = UserCourseFavourites
      fields = ('id', 'course', 'user')

class UserCourseFavouritesReadSerializer(UserCourseFavouritesSerializer):
    course = CourseSerializer(many=True)
    user = UserSerializer(read_only=True)

class CourseCommentSerializer(serializers.ModelSerializer):

    class Meta:
      model = CourseComment
      fields = ('id', 'comment', 'created_at', 'course', 'user')

# class UserAbstractSerializer(serializers.ModelSerializer): 

#     class Meta:
#       model = User
#       fields = ('first_name', 'last_name', 'handicap', 'user_bio', 'profileimage', 'video_of_swing')

class PopulatedUserSerializer(serializers.ModelSerializer):

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

    usergolfbag = GolfBagSerializer(many=True)  
    usergolfphotos = UserGolfPhotosSerializer(many=True)
    usercourseplayed = UserCoursePlayedReadSerializer(many=True)
    usercoursewishlist = UserCourseWishlistReadSerializer(many=True)
    usercoursefavourites = UserCourseWishlistReadSerializer(many=True)
    usercoursecomments = CourseCommentSerializer(many=True)
    userhomecourse = UserHomeCourseSerializer(many=True)
      
    class Meta:
      model = User
      fields = ('id','username', 'email', 'password', 'password_confirmation', 'usergolfbag', 'usergolfphotos', 'usercourseplayed', 'usercoursewishlist', 'usercoursefavourites', 'usercoursecomments', 'userhomecourse')