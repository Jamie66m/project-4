from django.urls import path
from .views import CourseListView, CourseDetailView, HoleListView, HoleDetailView, HoleDetailView, HoleTeeBoxListView, HoleTeeBoxDetailView, CourseImageListView, CourseImageDetailView

urlpatterns = [
  path('courses/', CourseListView.as_view()),
  path('courses/<int:pk>/', CourseDetailView.as_view()),
  path('courses/<int:pk>/holes/', HoleListView.as_view()),
  path('courses/<int:pk>/holes/<int:pk2>/', HoleDetailView.as_view()),
  path('courses/<int:pk>/holes/<int:pk2>/holeteeboxes/', HoleTeeBoxListView.as_view()),
  path('courses/<int:pk>/holes/<int:pk2>/holeteeboxes/<int:pk3>', HoleTeeBoxDetailView.as_view()),
  path('courses/<int:pk>/images/', CourseImageListView.as_view()),
  path('courses/<int:pk>/images/<int:pk4>', CourseImageDetailView.as_view()),
]