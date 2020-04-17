from rest_framework import serializers

from .models import Address, Course, CourseImage, Hole, HoleTeeBox

class AddressSerializer(serializers.ModelSerializer):

  class Meta:

    model = Address
    fields = ('id', 'address_line_1', 'address_line_2', 'town', 'county', 'postcode')

class CourseSerializer(serializers.ModelSerializer):

  class Meta:

    model = Course
    fields = ('id', 'name', 'number_of_holes', 'country', 'phone_number',
    'website_link', 'contact_name', 'year_built', 'email_address', 'green_fees', 'ranking', 
    'hero_image', 'description', 'video_highlight_link', 'video_description', 'pro_golfer_img_1', 
    'pro_golfer_img_2', 'pro_golfer_1_review', 'pro_golfer_2_review', 'course_type', 'scorecard', 'address')

class CourseImageSerializer(serializers.ModelSerializer):

  class Meta:
    model = CourseImage
    fields = ('id', 'image', 'course')

class CourseImageSerializer(serializers.ModelSerializer):

  class Meta:
    model = Hole
    fields = ('id', 'number', 'video', 'hole_graph', 'bunkers')

class PopulateCourseSerializer(serializers.ModelSerializer):

  instructor = InstructorSerializer()
  student_classes = StudentClassSerializer(many=True)

  class Meta:
    model = Student
    fields = ('id', 'name', 'age', 'image', 'instructor', 'student_classes')