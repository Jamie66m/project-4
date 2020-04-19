from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT

from rest_framework.response import Response

from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated, BasePermission


from django.contrib.auth import get_user_model
User = get_user_model()

from .models import GolfBag, UserGolfPhotos, UserCoursePlayed, UserCourseFavourites, UserCourseWishlist, CourseComment, UserHomeCourse

from django.conf import settings
import jwt
from .serializers import UserSerializer, UserProfileSerializer, UserCourseFavouritesSerializer, UserCoursePlayedSerializer, UserCourseWishListSerializer, UserGolfPhotosSerializer, CourseCommentSerializer, GolfBagSerializer, UserHomeCourseSerializer

class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

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

class UserProfileListView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer

    def get_all_user_profiles(self, request):
      users = User.objects.all()
      serializer = UserProfileSerializer(users, many=True)

      return Response(serializer.data)

class UserProfileDetailView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer

    def get_user_profile(self, request, pk):
      user = User.objects.get(pk=pk)
      serializer = UserProfileSerializer

      return Response(serializer.data)

class GolfBagCreateView(ListCreateAPIView):
    queryset = GolfBag.objects.all()
    serializer_class = GolfBagSerializer

    def get(self, request, pk):
      golfbag = GolfBag.objects.filter(user_id=pk)
      serializer = GolfBagSerializer(golfbag, many=True)
      return Response(serializer.data)

    def post(self, request, pk, *args, **kwargs):
      golfbag = GolfBag.objects.create(user_id=pk)
      serializer = GolfBagSerializer(golfbag, data=request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=HTTP_201_CREATED)
      return Response(serializer.data, status=HTTP_422_UNPROCESSABLE_ENTITY)

class GolfBagDetailView(RetrieveUpdateDestroyAPIView):
    queryset = GolfBag.objects.all()
    serializer_class = GolfBagSerializer
    # permission_classes = (IsOwnerOrReadOnly,)

    def get(self, request, pk, *args, **kwargs):
      golfbag = GolfBag.objects.get(id=self.kwargs.get('pk5', ''))
      serializer = GolfBagSerializer(golfbag)
      return Response(serializer.data)

#     def get_golf_bag(self, request, pk):
#       golfbag = GolfBag.objects.filter(user_id=pk)
#       # self.check_object_permissions(request, golf_bag)
#       serializer = GolfBagSerializer(golfbag)
#       return Response(serializer.data)

#     def post(self, request, pk):
#       golfbag = GolfBag.objects.filter(user_id=pk)
#       serializer = GolfBagSerializer(data=request.data)
#       if serializer.is_valid():
#         serializer.save(user=request.user) # add the user to the model on save
#         return Response(serializer.data, status=201)
#       return Response(serializer.data)

class UserGolfPhotosListView(ListCreateAPIView):
    queryset = UserGolfPhotos.objects.all()
    serializer_class = UserGolfPhotosSerializer

    def get(self, request, pk):
      usergolfphotos = UserGolfPhotos.objects.filter(user_id=pk)
      serializer = UserGolfPhotosSerializer(usergolfphotos, many=True)

      return Response(serializer.data)

class UserGolfPhotosDetailView(RetrieveUpdateDestroyAPIView):
    queryset = UserGolfPhotos.objects.all()
    serializer_class = UserGolfPhotosSerializer

    def get(self, request, pk, *args, **kwargs):
      usergolfphoto = UserGolfPhotos.objects.get(id=self.kwargs.get('pk6', ''))
      serializer = UserGolfPhotosSerializer(usergolfphoto)
      return Response(serializer.data)

class AllUsersCoursePlayedListView(ListCreateAPIView):
    queryset = UserCoursePlayed.objects.all()
    serializer_class = UserCoursePlayedSerializer

    def get(self, request):
      allcoursesplayed = UserCoursePlayed.objects.all()
      serializer = UserCoursePlayedSerializer(allcoursesplayed, many=True)

      return Response(serializer.data)

class UserCoursePlayedListView(ListCreateAPIView):
    queryset = UserCoursePlayed.objects.all()
    serializer_class = UserCoursePlayedSerializer

    def get(self, request, pk):
      allusercourseplayeds = UserCoursePlayed.objects.filter(user_id=pk)
      serializer = UserCoursePlayedSerializer(allusercourseplayeds, many=True)
      return Response(serializer.data)

    def post(self, request, pk, *args, **kwargs):
      addcourseplayedbyuser = UserCoursePlayed.objects.create(user_id=pk)
      serializer = UserCoursePlayedSerializer(addcourseplayedbyuser, data=request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=HTTP_201_CREATED)
      return Response(serializer.data, status=HTTP_422_UNPROCESSABLE_ENTITY)

class UserCoursePlayedDetailView(RetrieveUpdateDestroyAPIView):
    queryset = UserCoursePlayed.objects.all()
    serializer_class = UserCoursePlayedSerializer

    def get(self, request, pk, *args, **kwargs):
      courseplayedbyuser = UserCoursePlayed.objects.get(id=self.kwargs.get('pk7', ''))
      serializer = UserCoursePlayedSerializer(courseplayedbyuser)
      return Response(serializer.data)

class UserCourseWishListListView(ListCreateAPIView):
    queryset = UserCourseWishlist.objects.all()
    serializer_class = UserCourseWishListSerializer

    def get(self, request, pk):
      allusercoursewishlist = UserCourseWishlist.objects.filter(user_id=pk)
      serializer = UserCourseWishListSerializer(allusercoursewishlist, many=True)
      return Response(serializer.data)

    def post(self, request, pk, *args, **kwargs):
      addcoursewishlistbyuser = UserCourseWishlist.objects.create(user_id=pk)
      serializer = UserCourseWishListSerializer(addcoursewishlistbyuser, data=request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=HTTP_201_CREATED)
      return Response(serializer.data, status=HTTP_422_UNPROCESSABLE_ENTITY)

class UserCourseWishListDetailView(RetrieveUpdateDestroyAPIView):
    queryset = UserCourseWishlist.objects.all()
    serializer_class = UserCourseWishListSerializer

    def get(self, request, pk, *args, **kwargs):
      coursewishlistbyuser = UserCourseWishlist.objects.get(id=self.kwargs.get('pk8', ''))
      serializer = UserCourseWishListSerializer(coursewishlistbyuser)
      return Response(serializer.data)

class AllUsersCourseFavouritesList(ListCreateAPIView):
    queryset = UserCourseFavourites.objects.all()
    serializer_class = UserCourseFavouritesSerializer

    def get(self, request):
      allcoursefavourites = UserCourseFavourites.objects.all()
      serializer = UserCourseFavouritesSerializer(allcoursefavourites, many=True)

      return Response(serializer.data)

class UserCourseFavouritesListView(ListCreateAPIView):
    queryset = UserCourseFavourites.objects.all()
    serializer_class = UserCourseFavouritesSerializer

    def get(self, request, pk):
      allusercoursefavourites = UserCourseFavourites.objects.filter(user_id=pk)
      serializer = UserCourseFavouritesSerializer(allusercoursefavourites, many=True)
      return Response(serializer.data)

    def post(self, request, pk, *args, **kwargs):
      addcoursefavouritebyuser = UserCourseFavourites.objects.create(user_id=pk)
      serializer = UserCourseFavouritesSerializer(addcoursefavouritebyuser, data=request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=HTTP_201_CREATED)
      return Response(serializer.data, status=HTTP_422_UNPROCESSABLE_ENTITY)

class UserCourseFavouritesDetailView(RetrieveUpdateDestroyAPIView):
    queryset = UserCourseFavourites.objects.all()
    serializer_class = UserCourseFavouritesSerializer

    def get(self, request, pk, *args, **kwargs):
      coursefavouritebyuser = UserCourseFavourites.objects.get(id=self.kwargs.get('pk9', ''))
      serializer = UserCourseFavouritesSerializer(coursefavouritebyuser)
      return Response(serializer.data)

class UserHomeCourseDetailView(RetrieveUpdateDestroyAPIView):
    queryset = UserHomeCourse.objects.all()
    serializer_class = UserHomeCourseSerializer

    def post(self, request, pk, *args, **kwargs):
      userhomecourse = UserHomeCourse.objects.create(user_id=pk)
      serializer = UserHomeCourseSerializer(userhomecourse, data=request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=HTTP_201_CREATED)
      return Response(serializer.data, status=HTTP_422_UNPROCESSABLE_ENTITY)


class CourseCommentListView(ListCreateAPIView):
    queryset = CourseComment.objects.all()
    serializer_class = CourseCommentSerializer

    def get(self, request, pk, *args, **kwargs):
      coursecomments = CourseComment.objects.filter(course_id=pk)
      serializer = CourseCommentSerializer(coursecomments, many=True)
      return Response(serializer.data)

    def post(self, request, pk, *args, **kwargs):
      addcoursecommentbyuser = CourseComment.objects.create(user_id=pk)
      serializer = CourseCommentSerializer(addcoursecommentbyuser, data=request.data)
      if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=HTTP_201_CREATED)
      return Response(serializer.data, status=HTTP_422_UNPROCESSABLE_ENTITY)

class CourseCommentDetailView(RetrieveUpdateDestroyAPIView):
    queryset = CourseComment.objects.all()
    serializer_class = CourseCommentSerializer
    permission_classes = (IsOwnerOrReadOnly,)

    def get(self, request, pk, *args, **kwargs):
       coursecomment = CourseComment.objects.get(id=self.kwargs.get('pk10', ''))
       self.check_object_permissions(request, coursecomment)
       serializer = CourseCommentSerializer(coursecomment)

       return Response(serializer.data)
