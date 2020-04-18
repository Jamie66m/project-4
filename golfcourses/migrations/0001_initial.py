# Generated by Django 3.0.5 on 2020-04-18 14:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address_line_1', models.CharField(max_length=50)),
                ('address_line_2', models.CharField(blank=True, max_length=50)),
                ('town', models.CharField(max_length=50)),
                ('county', models.CharField(blank=True, max_length=50)),
                ('postcode', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('number_of_holes', models.IntegerField()),
                ('country', models.CharField(max_length=20)),
                ('phone_number', models.CharField(blank=True, max_length=20)),
                ('website_link', models.URLField(max_length=400)),
                ('contact_name', models.CharField(max_length=20)),
                ('year_built', models.PositiveIntegerField(blank=True)),
                ('email_address', models.EmailField(max_length=254)),
                ('green_fees', models.CharField(blank=True, max_length=5)),
                ('ranking', models.PositiveIntegerField()),
                ('hero_image', models.CharField(max_length=300)),
                ('description', models.CharField(max_length=500)),
                ('video_highlight_link', models.CharField(max_length=400)),
                ('video_description', models.CharField(blank=True, max_length=200)),
                ('pro_golfer_img_1', models.CharField(max_length=300)),
                ('pro_golfer_img_2', models.CharField(max_length=300)),
                ('pro_golfer_1_review', models.CharField(max_length=200)),
                ('pro_golfer_2_review', models.CharField(max_length=200)),
                ('course_type', models.CharField(max_length=10)),
                ('scorecard', models.CharField(max_length=300)),
                ('address', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to='golfcourses.Address')),
            ],
        ),
        migrations.CreateModel(
            name='Hole',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.PositiveIntegerField()),
                ('video', models.CharField(blank=True, max_length=400)),
                ('hole_graph', models.CharField(blank=True, max_length=400)),
                ('bunkers', models.PositiveIntegerField()),
                ('Mens_Par', models.PositiveIntegerField()),
                ('Mens_SI', models.PositiveIntegerField()),
                ('Ladies_Par', models.PositiveIntegerField()),
                ('Ladies_SI', models.PositiveIntegerField()),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='coursesholes', to='golfcourses.Course')),
            ],
        ),
        migrations.CreateModel(
            name='HoleTeeBox',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('teeboxtype', models.CharField(max_length=30)),
                ('color', models.CharField(max_length=10)),
                ('length', models.PositiveIntegerField()),
                ('hole', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='holes', to='golfcourses.Hole')),
            ],
        ),
        migrations.CreateModel(
            name='CourseImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.CharField(max_length=400)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='coursesimages', to='golfcourses.Course')),
            ],
        ),
    ]
