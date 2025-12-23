# Movie-Review-Site
A full-stack movie Review application built with React, Node.js, and PostrgreSQL. Users can browse a catalog of movies, view information and leave star-rated reviews.

##

### Tech Stack
**Frontend**
* **React.js**: Component-based UI logic.

* **React Router**: For seamless navigation between the List and Detail pages.

* **CSS3:** Custom styles with Flexbox and Grid for a "Cinema" dark-mode theme.

**Backend**
* **Node.js & Express:** RESTful API to handle movie data and review submissions.

* **PostgreSQL:** Relational database for persistent storage.

* **CORS**: Enabled for secure cross-origin communication.
##

Database Structure
1. **Movies Table**: stores title, description, and and poster URL.
2. **Reviews Table**: Stores reviewer name, rating (1-5), review text, and timestap, linked via movie_id.

##

# Getting Started
1. Clone & Install
```
git clone https://github.com/Felix670-dot/Movie-Review-Site.git
cd Movie-Review-Site

# Install Backend Dependencies
cd server
npm install

# Install Frontend Dependencies
cd ../clent/vite-project
npm install
```
**2. Databes Setup** 
Creat a PostgresSQL database and run the provided schema migration script (Or use your own setup script). ENsure your ```.env``` file in the backend folder include:
* ```DB_USER```
* ```DB_PASSWORD```
* ```DB_HOST```
* ```DB_PORT```
* ```DB_NAME```

You can use the following command to create the tables once you have your database set up.

```
psql -U username -d databasename -f server/db/schema.sql
```

**3. Run the Appilication**
```
# In server terminal
npm start

# In vite-project terminal
npm run dev
```

Some notes:
* I used Cursor AI to help me with pretty much everything. Spot mistakes, typos, correcting my code, adding things I was missing to my code, The styling, etc.
* Overall what i've learned is the structure of the server files, connection to each other, and the communication with the frontend.
* I did attempt to deploy this on vercel but was unsuccesful. It should still work locally. 

Link to site (not working):
