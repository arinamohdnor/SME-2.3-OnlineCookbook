![Main Branch](https://github.com/arinamohdnor/SME-2.3-OnlineCookbook/workflows/Main%20Branch/badge.svg)
# Cookbook

A Full Stack social recipe sharing app that let's you follow your friends' recipes, fork them (put your own spin on a recipe), and create cooking events that are referred to as potlucks. 

![Alt text](./assets/cookbook.gif?raw=true "Landing Page")

## Getting Started 

Assuming ```npm, node.js, and whatever that this system needs i dont even know``` is installed,

1. Enter (in cmd) ```npm install``` on both backend and frontend folders.
2. Install latest version of postgresql @ https://www.postgresql.org, leave everything as default, set password as 'root'
3. Head over to ```{POSTGRES_INSTALLATION_FOLDER}/data```. *normally C:\Program Files\PostgreSQL\13\data*
4. Open ```postgresql.conf``` with any text editor.
5. Look up ```password_encryption``` and change from scram-sha-256 to ```md5```. Close and save.
6. Open ```pg_hba.conf``` with any text editor, scroll all the way down and change all "scram-sha-256" to ```md5```. Close and save.
7. Search ```Services``` at Windows Search, and look for ```postgres-x65``` service. Right click > start (if it's already started, do restart).
8. Head over to ```{POSTGRES_INSTALLATION_FOLDER}/bin```. *normally C:\Program Files\PostgreSQL\13\bin*
9. Open cmd to that directory, and enter ```psql -U postgres``` and put 'root' as password.
10. Type in ```alter role postgres with password 'root';``` This is to refresh the password encryption from scram to md5.
11. Check by entering ```SELECT rolname, rolpassword FROM "pg_authid";``` and make sure 'postgres' user has md5 in the beginning of it's password.

11a. If it's still scram, please make sure steps 4-7 are done correctly.

If there are no problems so far,

12. Create cookbookdb database by entering ```CREATE DATABASE cookbookdb;``` in the terminal.
13. If there is no error, type ```\q``` to exit the postgres terminal.
14. Enter ```psql -d cookbookdb -U postgres -f "{YOUR PROJECT DIRECTORY}\backend\db\cookbookdb.sql``` to dump database infos.
15. Enter (in cmd) ```npm start``` on both backend and frontend folders (two separate cmds)
16. System will automatically open up ```localhost:3000``` in browser, and you should be set!

## Features


### User Authentication 

Modals are used for login and registration. Using bcrypt, user passwords are hashed and salted. 

![Alt text](./assets/cookbooklogin.gif?raw=true "Login")


### Notifications 

Users are notified when they are invited to a Potluck, one of their recipes is favorited, they receive a comment on a recipe post, or when they have a new follower. 

![Alt text](./assets/cookbook-notification.gif?raw=true "Notifications")


### Live Search 

Using the react-autosuggest module, users can search for recipes by recipe name or other users by username or full name. With each key press, a fetch request is made and the results that are displayed are live updated.  

![Alt text](./assets/cookbook-search.gif?raw=true "Live Search")


### Like and Comment 

Users can favorite or unfavorite recipes by clicking on the heart icon. The number of likes is displayed next to the heart. At the bottom of each recipe, users can also add comments. 

![Alt text](./assets/cookbook-likefinal.gif?raw=true "Like/Comment")


### Add recipes

Users add new recipes filling out ingredients, directions, etc in the add recipe form. They have the option to mark the recipe as vegeterian or vegan, as well as whether it can be forked by other users. 

![Alt text](./assets/cookbook-addrecipe.gif?raw=true "Add Recipe")


### Events aka Potlucks

Potlucks allow users to create events where they invite friends that they are following and add food items they would like invitees to bring. Potluck pages display the date, time, and location of the potluck as well as the invitee and things to bring lists. Invitees change their RSVP status and and can invite friends. 

![Alt text](./assets/cookbook-potluck.gif?raw=true "Potluck RSVP/Add")

In the "Things to Bring" section of potlucks, users can sign up or remove their sign ups for specific things and even suggest new things to bring to the Potluck. 

![Alt text](./assets/cookbook-potluckthings.gif?raw=true "Potluck Things To Bring")


### Fork Recipes 

Forking a recipe is make a copy of a recipe and put your own twist on it. 

![Alt text](./assets/cookbook-fork.gif?raw=true "Fork")


### User Profile Page

View a user's recipes sorted by top and most recent. Also view the recipes they have favorited. The user profile page also provides information on how many followers and following a specific user has. 

![Alt text](./assets/cookbook-profile.gif?raw=true "Profile")

