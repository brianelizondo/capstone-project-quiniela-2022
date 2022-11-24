# Quiniela 2022 Project
Capstone Project for USF Software Engineer Bootcamp


## Capstone Project Overview

**Project Steps**
* **Step One - Initial Project Ideas:** _You'll pick up to 3 project ideas to propose to your mentor and the community. You'll also explore some potential APIs._

* **Step Two - Project Proposal:** _For this step, you'll write a proposal for the site you want to build. This will help your mentor better understand your chosen capstone project idea._

* **Step Three - Source Your Data:** _After your mentor approves of your capstone project proposal, you'll figure out the database design of your application and where your data will come from. You may choose to use an existing API or create your own._

* **Step Four - Coding User Flows:** _Once you've figured out what you're building, you'll write the code to implement it. It's important to think about what you want a user's experience to be like as they navigate your site._

* **Step Five - Polishing Your Application** _Once you have the core functionality implemented, you'll focus on additional UI enhancements and styling for your application. This is where you will implement your bells and whistles._

* **Step Six - Documenting and Submission:** _You've done a lot of work so now it's time to show your mentor your progress! Create a README in markdown, make sure your GitHub is organized, and submit your finalized project._


## Completed Project Steps

* **Steps One and Two completed**

This is the project idea selected to be developed as the final project of this bootcamp.
This is an idea developed by me some years ago but with technologies like PHP, HTML, CCS and MySQL. I would develop the same basic idea of the project but using everything learned in the course for Back-End and Front-End development and API use.

The project deals with a web page which is responsible for registering people who are going to participate in a kind of "guessing game" in which they must register or predict the results of the soccer games that will take place in the next World Cup. in Qatar 2022.

The person registers and the system will begin to show the groups and games of each group, they must enter the possible result of that match, then the system, based on the results that the person entered, calculates the teams that qualify for the next phase and It shows the person the games to be played with the classified teams. This process is done for the Round of 16, Quarterfinal, Semifinal, Third Place, and Final games.

The participant earns points depending on the actual results of each game, the system is responsible for verifying the result entered by the person and assigning the corresponding points.
At the end of all the games the system determines the winner by checking the participant with the most points earned.

The project should make use of all the technologies covered in the course such as: back-end development to receive and send information to the front-end, use of a database to store the information of participants and results, front-end development end to interact with the participant and use of an API to obtain information regarding teams, players, games, etc.


* **Step Three completed - Source Your Data**

  a. **Pre Existing API:** _For this project an API called "API-FOOTBALL (3.9.2)" will be used to obtain additional information about the matches, fixtures, teams, players and general statistics. For more information about the API you can check here [API Docs](https://www.api-football.com/documentation-v3)._

  b. **Homemade API:** _The project will have its own API for handling user registration requests, login, registration of new "quinielas" and get general information of the project from a PostgreSQL database. Most of the information will be stored in a PostgreSQL database, information about users, pools, cities, stadiums, games in phase 1, games in phase 2, game results, etc will be stored._

  c. **Schema:** _The initial database schema with the tables and relationships can be seen in the attached image. It is composed of 10 tables but they can change in their internal rows or have more tables at the end of the development of the project._
![Quiniela 2022 Project - Initial Schema](https://github.com/brianelizondo/capstone-project-quiniela-2022/blob/master/documents/db_schema.png)
