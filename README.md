# Space Missions Project

---

This is a simple project aimming to create a full stack application, using Docker, MySQL, Node.js and React.js along with some other frameworks. It contains a MySQL database that connects to a backend API REST in Node.js and all data is show and managed via the frontend React.js web.

---

- Overview
  - [Links](#links)
  - [Built with](#built-with)
  - [How to](#how-to)
  - [Author](#author)

---

## Links

TBA

---

## Built with

- **Database**:
  - Dockerized MySQL
- **Backend**:
  - Node.js
  - Express
- **Frontend**:
  - React.js

---

## How to

To start the application and test it yourself, please do as it follows:

1. **Create a `docker-compose.yaml` file**

There's a `docker-compose-example.yaml` to guide you through this step, the only thing you need to change in this example file is the password for the MySQL server, which could be any you like, such as 'root'.

Afterwards, you must set the PORT in which this MySQL server will run. By default it is 3306, but as you may be running a MySQL Workbench in your OS, it's possible to change the port to any other, such as 3306**0**.

2. **Run `docker-compose up -d` on your CLI**

Simple as that, get your dockerized MySQL up. If it's all good, you should receive a `Running 3/3` echo.

3. **Fill the database with it's default data**

There's a scriptdb.sql file in the application's root. We have to run it in our dockerized MySQL in order to fill the database with the default data (To discover our MySQL container ID, we must run `docker ps` and find the Image mysql:8.0.29).

Follow these steps:

  - run `docker cp ./scriptdb.sql <CONTAINER-ID>:/` # This will copy our scriptdb.sql file to our dockerized container.
  - run `docker exec <CONTAINER-ID> /bin/sh -c 'mysql -uroot -p </scriptdb.sql` # You will be prompted to type the password you set in docker-compose.yaml

Done! You could run `docker exec <CONTAINER-ID> mysql -uroot -p` to enter MySQL CLI and run `SHOW DATABASES;` to check if it's all good.

4. **Create a `.env` file**

In order to configurate our application, we need to set our environment variables.

Inside the `backend` folder there's a .env.example file to be filled. Remember to fill it with the exact same information you filled in the `docker-compose.yaml` file.

After that, you can run a `npm run dev` inside the backend's folder, to check if it's all good so far.

You should be able to see a echo message, saying is all clear.

6. **TBA**

TBA

## Author

[GuillePinho](https://github.com/guillepinho)