from django.db import models

from golfcourses.models import Course

from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):

  first_name = models.CharField(max_length=20, blank=True)
  last_name = models.CharField(max_length=20, blank=True)
  user_bio = models.CharField(max_length=200, blank=True)
  handicap = models.PositiveIntegerField(null=True)
  profileimage = models.ImageField(blank=True)
  video_of_swing = models.FileField(blank=True)
  
class GolfBag(models.Model):
  putter = models.CharField(max_length=30)
  sw = models.CharField(max_length=30)
  pw = models.CharField(max_length=30)
  gw = models.CharField(max_length=30)
  lw = models.CharField(max_length=30)
  ulw = models.CharField(max_length=30)
  irons = models.CharField(max_length=30)
  woods = models.CharField(max_length=30)
  driver = models.CharField(max_length=30)

  user = models.ForeignKey(User, related_name="usergolfbag", on_delete=models.PROTECT)

  def __str__(self):
    return f'{self.user}' 

class UserGolfPhotos(models.Model):

  image = models.ImageField()
  user = models.ForeignKey(User, related_name="usergolfphotos", on_delete=models.PROTECT)

  def __str__(self):
    return f'{self.user} + {self.image}' 

class UserHomeCourse(models.Model):
  course = models.OneToOneField(Course, on_delete=models.PROTECT)
  user = models.ForeignKey(User, related_name="userhomecourse", on_delete=models.PROTECT)

  def __str__(self):
    return f'{self.user} + {self.course}' 

class UserCoursePlayed(models.Model):

  rating = models.PositiveIntegerField()
  score = models.PositiveIntegerField()
  time = models.DateField()
  course = models.ManyToManyField(Course, related_name="courseplayed", blank=True)

  user = models.ForeignKey(User, related_name="usercourseplayed", on_delete=models.CASCADE)

  def __str__(self):
    return f'{self.user} + {self.course}' 

class UserCourseWishlist(models.Model):

  course = models.ManyToManyField(Course, related_name="coursewishlist", blank=True)
  user = models.ForeignKey(User, related_name="usercoursewishlist", on_delete=models.CASCADE)

  def __str__(self):
    return f'{self.user} + {self.course}' 

class UserCourseFavourites(models.Model):

  course = models.ManyToManyField(Course, related_name="coursefavourites", blank=True)
  user = models.ForeignKey(User, related_name="usercoursefavourites", on_delete=models.CASCADE)

  def __str__(self):
    return f'{self.user} + {self.course}' 

class CourseComment(models.Model):
  comment = models.CharField(max_length=200)
  created_at = models.DateTimeField(auto_now_add=True)
  course = models.ForeignKey(Course, related_name="coursecomments", on_delete=models.PROTECT)
  user = models.ForeignKey(User, related_name='usercoursecomments', on_delete=models.PROTECT)

  def __str__(self):
    return f'{self.user} + {self.course}' 