from django.contrib import admin

from .models import Course, Address, CourseImage, Hole, HoleTeeBox


admin.site.register(Course)
admin.site.register(Address)
admin.site.register(CourseImage)
admin.site.register(Hole)
admin.site.register(HoleTeeBox)