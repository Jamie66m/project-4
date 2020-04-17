from django.contrib.postgres.fields import ArrayField
from django.db import models

class Address(models.Model):
  address_line_1 = models.CharField(max_length=50)
  address_line_2 = models.CharField(max_length=50)
  town = models.CharField(max_length=50)
  county = models.CharField(max_length=50)
  postcode = models.CharField(max_length=50)

  def __str__(self):
    return f'{self.address_line_1} + {self.address_line_2} + {self.town} + {self.county} + {self.postcode}'

class Course(models.Model):
  name = models.CharField(max_length=50)
  number_of_holes = models.IntegerField()
  country = models.CharField(max_length=20)
  phone_number = models.IntegerField()
  website_link = models.URLField(max_length=400)
  contact_name = models.CharField(max_length=20)
  year_built = models.PositiveIntegerField(blank=True)
  email_address = models.EmailField()
  green_fees = models.CharField(max_length=5, blank=True)
  ranking = models.PositiveIntegerField()
  hero_image = models.ImageField(verbose_name="Course Image")
  description = models.CharField(max_length=200)
  video_highlight_link = models.CharField(max_length=400)
  video_description = models.CharField(max_length=200, blank=True)
  pro_golfer_img_1 = models.CharField(max_length=300)
  pro_golfer_img_2 = models.CharField(max_length=300)
  pro_golfer_1_review = models.CharField(max_length=200)
  pro_golfer_2_review = models.CharField(max_length=200)
  course_type = models.CharField(max_length=10)
  scorecard = models.CharField(max_length=300)

  address = models.OneToOneField(Address, on_delete=models.PROTECT)

  def __str__(self):
    return self.name


class CourseImage(models.Model):
  image = models.CharField(max_length=400)
  course = models.ForeignKey(Course, related_name='coursesimages', on_delete=models.PROTECT)

  def __str__(self):
    return self

class Hole(models.Model):
  number = models.PositiveIntegerField()
  video = models.CharField(max_length=400, blank=True)
  hole_graph = models.CharField(max_length=400, blank=True)
  bunkers = models.PositiveIntegerField()

  course = models.ForeignKey(Course, related_name='coursesholes', on_delete=models.PROTECT)

  def __str__(self):
    return self.number

class HoleTeeBox(models.Model):
  teeboxtype = models.CharField(max_length=30)
  color = models.CharField(max_length=10)
  length = models.PositiveIntegerField()
  Mens_Par = models.PositiveIntegerField()
  Mens_SI = models.PositiveIntegerField()
  Ladies_Par = models.PositiveIntegerField()
  Ladies_SI = models.PositiveIntegerField()

  hole = models.ForeignKey(Hole, related_name="holes", on_delete=models.CASCADE)

  def __str__(self):
    return self.color