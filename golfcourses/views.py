from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_422_UNPROCESSABLE_ENTITY, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT

from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView

from .models import Course, Hole, HoleTeeBox, CourseImage
from .serializers import CourseSerializer, PopulateCourseSerializer, HoleSerializer, PopulateHoleSerializer, HoleTeeBoxSerializer, CourseImageSerializer


class CourseListView(ListCreateAPIView):
  queryset = Course.objects.all()
  serializer_class = CourseSerializer

  def get(self, request):
    courses = Course.objects.all()
    serializer = PopulateCourseSerializer(courses, many=True)
    return Response(serializer.data)

  def post(self, request):
    serializer = CourseSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=HTTP_201_CREATED)
    return Response(serializer.data, status=HTTP_422_UNPROCESSABLE_ENTITY)

class CourseDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Course.objects.all()
  serializer_class = CourseSerializer
  permission_classes = (IsAuthenticated, )

  def get(self, request, pk):
    course = Course.objects.get(pk=pk)
    serializer = PopulateCourseSerializer(course)
    return Response(serializer.data)

class HoleListView(ListCreateAPIView):
  queryset = Hole.objects.all()
  serializer_class = HoleSerializer
  permission_classes = (IsAuthenticated, )

  def get(self, request, pk, *args, **kwargs):
    holes = Hole.objects.filter(course_id=pk)
    serializer = PopulateHoleSerializer(holes, many=True)
    return Response(serializer.data)

class HoleDetailView(RetrieveUpdateDestroyAPIView):
  queryset = Hole.objects.all()
  serializer_class = HoleSerializer
  permission_classes = (IsAuthenticated, )

  def get(self, request, *args, **kwargs):
    hole = Hole.objects.get(id=self.kwargs.get('pk2', ''))
    serializer = PopulateHoleSerializer(hole)
    return Response(serializer.data)

class HoleTeeBoxListView(ListCreateAPIView):
  queryset = HoleTeeBox.objects.all()
  serializer_class = HoleTeeBoxSerializer
  permission_classes = (IsAuthenticated, )

  def get(self, request, pk2, *args, **kwargs):
    holeteeboxes = HoleTeeBox.objects.filter(hole_id=pk2)
    serializer = HoleTeeBoxSerializer(holeteeboxes, many=True)
    return Response(serializer.data)

class HoleTeeBoxDetailView(RetrieveUpdateDestroyAPIView):
  queryset = HoleTeeBox.objects.all()
  serializer_class = HoleTeeBoxSerializer
  permission_classes = (IsAuthenticated, )

  def get(self, request, *args, **kwargs):
    holeteebox = HoleTeeBox.objects.get(id=self.kwargs.get('pk3', ''))
    serializer = HoleTeeBoxSerializer(holeteebox)
    return Response(serializer.data)


class CourseImageListView(ListCreateAPIView):
  queryset = CourseImage.objects.all()
  serializer_class = CourseImageSerializer
  permission_classes = (IsAuthenticated, )

  def get(self, request, pk, *args, **kwargs):
    courseimages = CourseImage.objects.filter(course_id=pk)
    serializer = CourseImageSerializer(courseimages, many=True)
    return Response(serializer.data)

class CourseImageDetailView(RetrieveUpdateDestroyAPIView):
  queryset = CourseImage.objects.all()
  serializer_class = CourseImageSerializer
  permission_classes = (IsAuthenticated, )

  def get(self, request, *args, **kwargs):
    courseimage = CourseImage.objects.get(id=self.kwargs.get('pk4', ''))
    serializer = CourseImageSerializer(courseimage)
    return Response(serializer.data)
