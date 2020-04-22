from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT

from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser



from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated, BasePermission


from django.contrib.auth import get_user_model
User = get_user_model()

from .models import GolfBag, UserGolfPhotos, UserCoursePlayed, UserCourseFavourites, UserCourseWishlist, CourseComment, UserHomeCourse

from golfcourses.models import Course

from django.conf import settings
import jwt
from .serializers import UserSerializer, PopulatedUserSerializer, UserCourseFavouritesSerializer, UserCoursePlayedSerializer, UserCoursePlayedReadSerializer, UserCourseWishListSerializer, UserGolfPhotosSerializer, CourseCommentSerializer, GolfBagSerializer, UserHomeCourseSerializer


class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Registration successful'})

        return Response(serializer.errors, status=422)


class LoginView(APIView):

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied({'message': 'Invalid credentials'})

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        user = self.get_user(email)
        if not user.check_password(password):
            raise PermissionDenied({'message': 'Invalid credentials'})

        token = jwt.encode({'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Welcome back {user.username}!'})

class UserProfileDetailView(APIView):
    parser_class = (FileUploadParser,)
    permission_classes = (IsAuthenticated, )

    def get(self, request):
      user = User.objects.get(pk=request.user.id)
      serializer = PopulatedUserSerializer(user)
      return Response(serializer.data)

class GolfBagCreateView(APIView):
    # queryset = GolfBag.objects.all()
    # serializer_class = GolfBagSerializer
    permission_classes = (IsAuthenticated, )

    def post(self, request):
      request.data['user'] = request.user.id
      golfbag = GolfBagSerializer(data=request.data)
      if golfbag.is_valid():
          golfbag.save()
          return Response(golfbag.data, status=HTTP_201_CREATED)
      return Response(golfbag.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class GolfBagDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, *args, **kwargs):
      golfbag = GolfBag.objects.get(id=self.kwargs.get('pk5', ''))
      serializer = GolfBagSerializer(golfbag)
      return Response(serializer.data)


class UserGolfPhotosListView(APIView):
    parser_class = (FileUploadParser,)
    permission_classes = (IsAuthenticated, )
    
    def get(self, request):
      usergolfphotos = UserGolfPhotos.objects.get(pk=request.user.id)
      serializer = UserGolfPhotosSerializer(usergolfphotos, many=True)
      return Response(serializer.data)

    def post(self, request, args):
      request.data['user'] = request.user.id
      usergolfphoto = UserGolfPhotosSerializer(data=request.data)
      if usergolfphoto.is_valid():
          usergolfphoto.save()
          return Response(usergolfphoto.data, status=HTTP_201_CREATED)
      return Response(usergolfphoto.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class UserGolfPhotosDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, pk, *args, **kwargs):
      usergolfphoto = UserGolfPhotos.objects.get(id=self.kwargs.get('pk6', ''))
      serializer = UserGolfPhotosSerializer(usergolfphoto)
      return Response(serializer.data)

class AllUsersCoursePlayedListView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
      allcoursesplayed = UserCoursePlayed.objects.all()
      serializer = UserCoursePlayedReadSerializer(allcoursesplayed, many=True)

      return Response(serializer.data)

class UserCoursePlayedListView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
      request.data['user'] = request.user.id
      addusercourseplayed = UserCoursePlayedSerializer(data=request.data)
      if addusercourseplayed.is_valid():
          addusercourseplayed.save()
          return Response(addusercourseplayed.data, status=HTTP_201_CREATED)
      return Response(addusercourseplayed.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class UserCoursePlayedDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, pk, *args, **kwargs):
      courseplayedbyuser = UserCoursePlayed.objects.get(id=self.kwargs.get('pk7', ''))
      serializer = UserCoursePlayedSerializer(courseplayedbyuser)
      return Response(serializer.data)

class UserCourseWishListListView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
      request.data['user'] = request.user.id
      addusercoursewishlist = UserCourseWishListSerializer(data=request.data)
      if addusercoursewishlist.is_valid():
          addusercoursewishlist.save()
          return Response(addusercoursewishlist.data, status=HTTP_201_CREATED)
      return Response(addusercoursewishlist.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class UserCourseWishListDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, pk, *args, **kwargs):
      coursewishlistbyuser = UserCourseWishlist.objects.get(id=self.kwargs.get('pk8', ''))
      serializer = UserCourseWishListSerializer(coursewishlistbyuser)
      return Response(serializer.data)

class AllUsersCourseFavouritesList(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
      allcoursefavourites = UserCourseFavourites.objects.all()
      serializer = UserCourseFavouritesSerializer(allcoursefavourites, many=True)

      return Response(serializer.data)

class UserCourseFavouritesListView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
      request.data['user'] = request.user.id
      addusercoursefavourite = UserCourseFavouritesSerializer(data=request.data)
      if addusercoursefavourite.is_valid():
          addusercoursefavourite.save()
          return Response(addusercoursefavourite.data, status=HTTP_201_CREATED)
      return Response(addusercoursefavourite.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class UserCourseFavouritesDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request, pk, *args, **kwargs):
      coursefavouritebyuser = UserCourseFavourites.objects.get(id=self.kwargs.get('pk9', ''))
      serializer = UserCourseFavouritesSerializer(coursefavouritebyuser)
      return Response(serializer.data)

class UserHomeCourseDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
      request.data['user'] = request.user.id
      addusercoursehome = UserHomeCourseSerializer(data=request.data)
      if addusercoursehome.is_valid():
          addusercoursehome.save()
          return Response(addusercoursehome.data, status=HTTP_201_CREATED)
      return Response(addusercoursehome.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)


class CourseCommentListView(APIView):
    permission_classes = (IsAuthenticated, )
    
    def post(self, request, pk, *args, **kwargs):
      request.data['user'] = request.user.id
      coursecomment = Course.objects.get(id=pk)
      addusercoursecomment = CourseCommentSerializer(data=request.data)
      if addusercoursecomment.is_valid():
          addusercoursecomment.save()
          return Response(addusercoursecomment.data, status=HTTP_201_CREATED)
      return Response(addusercoursecomment.errors, status=HTTP_422_UNPROCESSABLE_ENTITY)

class CourseCommentDetailView(APIView):
    permission_classes = (IsAuthenticated, )


    def get(self, request, pk, *args, **kwargs):
       coursecomment = CourseComment.objects.get(id=self.kwargs.get('pk10', ''))
       serializer = CourseCommentSerializer(coursecomment)

       return Response(serializer.data)
