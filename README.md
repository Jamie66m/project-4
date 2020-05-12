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


### 
