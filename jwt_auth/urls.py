from django.urls import path
from .views import RegisterView, LoginView, UserProfileListView, UserProfileDetailView, GolfBagCreateView, GolfBagDetailView, UserGolfPhotosListView, UserGolfPhotosDetailView, AllUsersCoursePlayedListView, UserCoursePlayedListView, UserCoursePlayedDetailView, UserCourseWishListListView, UserCourseWishListDetailView, AllUsersCourseFavouritesList, UserCourseFavouritesListView, UserCourseFavouritesDetailView, UserHomeCourseDetailView, CourseCommentListView, CourseCommentDetailView
# GolfBagDetailView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('profiles/', UserProfileListView.as_view()),
    path('profile/<int:pk>/', UserProfileDetailView.as_view()),
    path('profile/<int:pk>/golfbag', GolfBagCreateView.as_view()),
    path('profile/<int:pk>/golfbag/<int:pk5>', GolfBagDetailView.as_view()),
    path('profile/<int:pk>/photos', UserGolfPhotosListView.as_view()),
    path('profile/<int:pk>/photos/<int:pk6>', UserGolfPhotosDetailView.as_view()),
    path('allcoursesplayed', AllUsersCoursePlayedListView.as_view()),
    path('profile/<int:pk>/coursesplayed', UserCoursePlayedListView.as_view()),
    path('profile/<int:pk>/coursesplayed/<int:pk7>', UserCoursePlayedDetailView.as_view()),
    path('profile/<int:pk>/courseswishlist', UserCourseWishListListView.as_view()),
    path('profile/<int:pk>/courseswishlist/<int:pk8>', UserCourseWishListDetailView.as_view()),
    path('allcoursefavourites/', AllUsersCourseFavouritesList.as_view()),
    path('profile/<int:pk>/coursesfavourites', UserCourseFavouritesListView.as_view()),
    path('profile/<int:pk>/coursesfavourites/<int:pk9>', UserCourseFavouritesDetailView.as_view()),
    path('profile/<int:pk>/userhomecourse', UserHomeCourseDetailView.as_view()),
    path('courses/<int:pk>/coursecomments', CourseCommentListView.as_view()),
    path('courses/<int:pk>/coursecomments/<int:pk9>', CourseCommentDetailView.as_view())
]