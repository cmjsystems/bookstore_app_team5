# Team:
- Brayan Gutierrez              (Student Number: 223-1122)
- Claudiomar Moreira de Jesus   (Student Number: 223-0862)
- Felipe Cardona Jaramillo      (Student Number: 223-0752)
- Raymond Aligbe                (Student Number: 223-0898)

# GitHub:
- Create the project on GitHub with public permission (bookstore_app)
- In the local folder (/bookstore), run the commands:
  * git init
  * git status
  * git add . or git add *
  * git status
  * git commit -m "First Commit."
  * git status
  - Copy the commands from the GitHub website project
    * git remote add origin https://github.com/cmjsystems/bookstore_app.git
    * git branch -M main
    * git push -u origin main

- Clone from GitHub to local machine:
  * git clone https://github.com/cmjsystems/bookstore_app.git

# Bookstore App
Building a complete Bookstore App involves more detailed implementations, and we'll provide a basic setup in React application with authentication, inventory, and order pages. The structure for both the frontend (React and Node.js) and backend (Express with SQLite3).

# Initial Instructions
Backend (Node.js with Express and SQLite3):
1. Create a new Node.js project and install necessary packages:

 a. In Command Prompt or Windows Explorer, create the folder:
   * bookstore

 b. Open the Visual Studio Code and in the Terminal inside the resume folder: 
   * mkdir bookstore-backend

 c. Open the folder:
   * cd bookstore-backend

 d. Run the commands below:
   * npm init -y
   * npm install express sqlite3 better-sqlite3 bcrypt jsonwebtoken
   * npm install body-parser cors dotenv
   * npm install nodemon -D
   * ...or run: npm i (to create the node_modules folder)
   * ...or run: npm update (to update and fix errors the node_modules folder)

2. Create a file named "src/server.js" for your backend
   (It's done/created..)
 
3. Edit the package.json file.
<!--
{
  "name": "bookstore-backend",
  "version": "1.0.0",
  "description": "Bookstore APP Backend",
  "main": "server.js",
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  },
  "author": "Team 5: Brayan, Claudiomar, Felipe and Raymond",
  "license": "MIT",
  "dependencies": {
   ... -->

4. Create a ".env" file with the content:
   * PORT=5010
   * DB_PATH=./db/bookstores.db

5. Start the backend server:
(bash - Terminal)
  * npm run dev


Frontend (React)
1. Create a new React app project:
(bash - New Terminal)
  * cd ..
  * npx create-react-app bookstore-frontend

2. Install Axios for making HTTP requests:
(bash - Terminal)
  * npm install axios
  * npm install react-router-dom
  * npm install react-bootstrap bootstrap

3. Replace the contents of "src/App.js" with the following code.
   (It's done/created..)

4. Create src/BookList.js with the following code.
   (It's done/created..)

5. Create src/Inventory.js with the following code.
   (It's done/created..)

6. Create src/Order.js with the following code.
   (It's done/created..)

7. Start the React app:
(bash - Terminal)
  * npm run dev