from django.urls import path
from .views import RegisterView, LoginView, UserProfileDetailView, GolfBagCreateView, GolfBagDetailView, UserGolfPhotosListView, UserGolfPhotosDetailView, AllUsersCoursePlayedListView, UserCoursePlayedListView, UserCoursePlayedDetailView, UserCourseWishListListView, UserCourseWishListDetailView, AllUsersCourseFavouritesList, UserCourseFavouritesListView, UserCourseFavouritesDetailView, UserHomeCourseDetailView, CourseCommentListView, CourseCommentDetailView
# GolfBagDetailView

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('profile/', UserProfileDetailView.as_view()),
    path('profile/golfbag', GolfBagCreateView.as_view()),
    path('profile/golfbag/<int:pk>', GolfBagDetailView.as_view()),
    path('profile/photos', UserGolfPhotosListView.as_view()),
    path('profile/photos/<int:pk6>', UserGolfPhotosDetailView.as_view()),
    path('allcoursesplayed', AllUsersCoursePlayedListView.as_view()),
    path('profile/coursesplayed', UserCoursePlayedListView.as_view()),
    path('profile/coursesplayed/<int:pk7>', UserCoursePlayedDetailView.as_view()),
    path('profile/courseswishlist', UserCourseWishListListView.as_view()),
    path('profile/courseswishlist/<int:pk8>', UserCourseWishListDetailView.as_view()),
    path('allcoursefavourites/', AllUsersCourseFavouritesList.as_view()),
    path('profile/coursesfavourites', UserCourseFavouritesListView.as_view()),
    path('profile/coursesfavourites/<int:pk9>', UserCourseFavouritesDetailView.as_view()),
    path('profile/userhomecourse', UserHomeCourseDetailView.as_view()),
    path('courses/<int:pk>/coursecomments', CourseCommentListView.as_view()),
    path('courses/<int:pk>/coursecomments/<int:pk9>', CourseCommentDetailView.as_view())
]