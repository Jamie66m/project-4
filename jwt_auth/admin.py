from django.contrib import admin

from django.contrib.auth import get_user_model
User = get_user_model()

from .models import GolfBag, UserGolfPhotos, UserCoursePlayed, UserCourseWishlist, UserCourseFavourites, CourseComment

admin.site.register(User)
admin.site.register(GolfBag)
admin.site.register(UserGolfPhotos)
admin.site.register(UserCoursePlayed)
admin.site.register(UserCourseWishlist)
admin.site.register(UserCourseFavourites)
admin.site.register(CourseComment)
