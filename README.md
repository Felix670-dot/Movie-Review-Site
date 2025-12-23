# Movie-Review-Site
A full-stack movie Review application built with React, Node.js, and PostrgreSQL. Users can browse a catalog of movies, view information and leave star-rated reviews.

##

### Tech Stack
Frontend:
* React.js
* React Router

Backend:
* Node.js & Express
* PostgreSQL
* CORS

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

