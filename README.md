### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive

# Birdie Time

## Overview

Birdie Time was the fourth and final project that I completed during the Software Engineering Course. It is a full-stack desktop web application with a React.js front-end, a Django-Python back-end, and a PostgreSQL database.

This was a week long project and we had the option as a cohort to do it in groups or individually. I decided to do the project solo for a couple of reasons. I was eager to produce an application on a topic that I was very passionate about and secondly I was very keen to really understand where my skill level had got to over the three month course in order that when the course had finished I knew what areas I need to work on and improve. Lastly I didn't do a huge amount of work on the backend for my third project and I was keen to work and understand databases. 

Birdie Time is looking to take golf lovers on a journey to playing the top 50 golf courses in the UK & Northern Ireland. The inspiration to make a golf based app is because of my own love for the game and also due to the fact that the world of golf is definitely evolving with the current times and is probably the latest sport to be making moves and evolving through technological advancements.  

Birdie Time is going to be a 3 stage process and during the week long time-frame I completed the first stage. The first concept is to provide the user with a great amount of detail and all the relevant information on the top 50 courses as well as allowing the user to interact with each course. The second stage is for users to be able to follow each other, match based on handicap levels and compare scores, match based on the location of their local course and join virtual golf clubs where they can discuss courses and arrange times to play with each other. Lastly is for users to have their golf swing analysed and commented on by an online instructor.


Check out [Birdie Time](https://birdie-time.herokuapp.com/)

## Table of contents
1. [Brief](#Brief)
2. [Technologies used](#Technologies-used)
3. [Approach](#Approach)
    - [Planning](#Planning)
    - [Wireframes]
    - [Back-end](#Back-end)
    - [Front-end](#Front-end)
    - [File Structure](#File-structure)
4. [Screenshots](#Screenshots)
5. [Potential future features](#Potential-future-features)
6. [Bugs](#Bugs)
7. [Lessons learned](#Lessons-learned)
8. [Credit](#credit)

## Brief

* Choose to work solo or in a team
* **Build a full-stack application** by making your own backend and your own front-end
* **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. 
* **Be deployed online** so it's publicly accessible.


## Technologies Used
| Category | List |
| ---- | --- |
| Languages                            | Javascript (ECMAScript6), CSS3, Sass, HTML5 |
| Front-end Web Application Framework  | React.js |
| Server Environment                   | Django-Python |
| Database                             | PostgreSQL |
| CSS Framework                        | Bulma |
| REST client                          | Insomnia, Django Rest Framework |
| Typefaces                            | Font Awesome |
| Text Editor                          | VS Code |
| Browser                              | Chrome |
| Version control | Git and GitHub

## Approach Taken

### The Plan

At the start of the project I knew that I felt more comfortable with the front-end instead of the back-end and therefore gave myself more time to get the back-end right. Originally I tried to find an external API that would help generate all my data, however, there were no free public API's and therefore I decided to create the API myself and generate all the data using the django admin panel. 

I knew this approach would be relatively inefficient but it was the only way for me to generate all the data I needed in order that I could fetch it on the front-end. Due to the level of detail I wanted to provide for each course, to ensure the best possible user experience I knew that I would be creating many tables in the database and had to ensure that all the relationships between the models were accurate. 

### Wireframes

Several wireframes were put together on a site called MockFlow.

#### User Home

<p align="center">
  <img height=380 alt="home" src="./images/userhome.png">
</p>

#### User Profile
<p align="center">
  <img height=380 alt="itemIndex" src="./images/userprofile.png">
</p>


#### Profile Page
<p align="center">
  <img height=380 width=500 alt="userProfile" src="./images/courseprofile.png">
</p>


### The Back-end

As I have mentioned above there were going to be many relationships to work out and tables within the database.

#### Models

For the PostgreSQL database there are many tables for an individual golf course and the user. Currently a couple of the tables are not ineffect right now as they will be used when I work on the other two concepts for this application. 

Due to my knowledge of golf I understood the relationships between all the features on the golf course and felt comfortable translating this knowledge within my models for the golf course. It was vital that I got the models for the golf course right at the beginning as many complications and loss of precious time could have come from me having to drop the database due to errors I made in my models. Having said this on the application at the moment there are only 5 courses being shown and not 50. The reason for this is that I have realised I need to make adjustments to my models both for the golf course and for the user in the future to be able to instill the other concepts to the application. However, even though in my planning I should potentially have thought further ahead before writing the models but I was concentrating on what I need to generate for my MVP. 

Below are a few of the golf course models:

```py
class Course(models.Model):
  name = models.CharField(max_length=50)
  number_of_holes = models.IntegerField()
  country = models.CharField(max_length=20)
  phone_number = models.CharField(max_length=20, blank=True)
  website_link = models.URLField(max_length=400)
  contact_name = models.CharField(max_length=20)
  year_built = models.PositiveIntegerField(blank=True)
  email_address = models.EmailField()
  green_fees = models.CharField(max_length=5, blank=True)
  ranking = models.PositiveIntegerField()
  hero_image = models.CharField(max_length=300)
  description = models.CharField(max_length=500)
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
```

As you can see directly from the model above that I am implementing a lot of data into this project and I was aware that this was going to take time but I was eager to make sure the user was getting all the relevant information they needed about the course in order to kick start the process of them wanting to play it. 

```py
class Hole(models.Model):
  number = models.PositiveIntegerField()
  video = models.CharField(max_length=400, blank=True)
  hole_graph = models.CharField(max_length=400, blank=True)
  bunkers = models.PositiveIntegerField()
  Mens_Par = models.PositiveIntegerField()
  Mens_SI = models.PositiveIntegerField()
  Ladies_Par = models.PositiveIntegerField()
  Ladies_SI = models.PositiveIntegerField()

  course = models.ForeignKey(Course, related_name='coursesholes', on_delete=models.PROTECT)

  def __str__(self):
    return f'{self.course} - {self.number}'
```

```py 
class HoleTeeBox(models.Model):
  teeboxtype = models.CharField(max_length=30)
  color = models.CharField(max_length=10)
  length = models.PositiveIntegerField()

  hole = models.ForeignKey(Hole, related_name="holes", on_delete=models.CASCADE)

  def __str__(self):
    return f'{self.hole} - {self.color}'
```

I really wanted the user to be able to explore each course to its full potential which is why I decided to manually add in the django admin panel all 18 holes to the golf course and all the teeboxes for each hole. However, I knew there would be some variety between the courses with regards to the number of teeboxes on a hole and therefore only implemented three for each course as I knew this would be easier to manage on the front-end. 

The ForeignKey relationship was critical here as I understood a course needs many holes and a hole needs many teeboxes. However, frustratingly I had realised when nesting my serializers and understanding to do this I could use the `related_name` that I used a name that is confusing for the `HoleTeeBox` model by making the `related_name="holes"`. 

Below are the user models:

```py
class User(AbstractUser):

  first_name = models.CharField(max_length=20, blank=True)
  last_name = models.CharField(max_length=20, blank=True)
  user_bio = models.CharField(max_length=200, blank=True)
  handicap = models.PositiveIntegerField(null=True)
  profileimage = models.ImageField(blank=True)
  video_of_swing = models.FileField(blank=True)

```

For the users, I extended the basic User provided by Django to include the following extra fields: first_name, last_name, user_bio, handicap, profileimage and video_of_swing. Originally the purpose of this model was for users once they have registered and logged in that they could then update their profile information by adding this information. However, I struggled to implement a PUT route due to not quite writing the correct code in my Views and therefore at the moment this model is a little redundant. Furthermore, as a consequence I couldn't quite follow the wireframe I had drawn up for the user profile and therefore had to adapt. 


```py
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
```

The ability for a user to create a golf bag was an important feature for the MVP and the UX. I have, however, made a slight error with my relationship between the user and it's golfbag. This should be a `One-to-One` relationship instead of a ForeignKey relationship. I was only intending for the user to create one golf bag which they would be able to edit on their profile. Currently they are able to post many golf bags to the database but to counter this issue on the front-end the GET request for the users golfbag brings back a response of the most recent golfbag that has been created by the user. 

```js
 const golfbag = this.state.user.usergolfbag[0]
```

There are three other important models that definitely added to the UX of the application at this current point in time.

```py

class UserHomeCourse(models.Model):
  course = models.OneToOneField(Course, on_delete=models.PROTECT)
  user = models.ForeignKey(User, related_name="userhomecourse", on_delete=models.PROTECT)

  def __str__(self):
    return f'{self.user} + {self.course}' 
```

The user adding a home course is vital for the future concepts of the project. However, this model definitely needs to be adjusted in the future as the relationships are not quite correct. I would like for users to be able to find each other based on their home course and so that they can play with each other. 