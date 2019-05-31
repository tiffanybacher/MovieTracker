# MovieTracker
#### By [Tiffany Bacher](https://github.com/tiffanybacher) & [Jacob Bogart](https://github.com/jacobogart)
An educational project utilizing React, Redux, and Router to create a movie database tool with search, favoriting and account features. 

![image](https://user-images.githubusercontent.com/46252038/58738357-ab291080-83c2-11e9-9893-5bdefb0dd159.png)

![image](https://user-images.githubusercontent.com/46252038/58738376-bf6d0d80-83c2-11e9-8849-02beae46931e.png)

![image](https://user-images.githubusercontent.com/46252038/58738391-c8f67580-83c2-11e9-9782-4c85443443a2.png)

![image](https://user-images.githubusercontent.com/46252038/58738438-f80ce700-83c2-11e9-900d-1919028b5725.png)

## Installation - Front-End
Clone the repo - https://github.com/jacobogart/MovieTracker.git

Run `npm install` from the root directory

Run `npm start` and visit localhost:3000 in your browser

## Installation - Back-End
### (If you do not have PostgreSQL, please see instructions at the bottom for installation)
Clone down the back-end repo - https://github.com/turingschool-examples/movie-tracker.git

Run `npm install` from the root directory

Run `npm start` - visit localhost:3001/api/users - you should see a json response with a single user.

## Testing
Website is tested with Jest and Enzyme

Run `npm run test` to see test suite

## Learning Goals
* Interact with a provided back-end through the Fetch API, utilizing common account features 
* Utilize Redux and Router to provide a seamless user experience 
* Collaborate and create (and iterate) user stories
* Demonstrate good GitHub collaboration and workflow within a large group


## PostrgreSQL Installation:
Head over to [Postgres.app](http://postgresapp.com/) to download and install PostgreSQL

When you click `initialize`, you should now be able to see that postgreSQL is running

To be able to use the command line tools, you will need to run the following commannd in your terminal to configure your $PATH `sudo mkdir -p /etc/paths.d && echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /etc/paths.d/postgresapp`

You will need to close your terminal window and re-open it for the changes to take effect

### Creating our database

Make sure you are in you `movie-tracker` project folder

From the command line, run the following command to create a users database `psql -f ./database/users.sql`

When you start up the server (`npm install` and `npm start`), you should now be able to visit localhost:3000/api/users and see the database with a single user (Taylor)
