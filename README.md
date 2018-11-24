# Internet shop

## General
This project is a simple internet shop where admin can sell (create/update/delete) the hand-made products. Buyers can signup/login/logout with ability to buy/view, add to cart and checkout.

## Local Setup

### Prerequisites
To set up this repo for local viewing/testing, first of all make sure you have the latest stable versions of NodeJS and NPM installed.

You should also create a MongoDB cloud(free) database for the project to connect to. You can create one at(https://cloud.mongodb.com)

**Important:** You will be asked to set a database admin username and password when you create a database. You will need to remember these credentials.

### Installation
Once you have cloned the repo, navigate to the root directory in terminal and install the dependencies with:
```
npm install
```
You will need to make a copy of .env.test file and rename it to .env. You can populate this file with the credentials for your own MongoDB database. 

### Running the Development Server
To start the server:
```
npm run dev
```
In your browser, navigate to [http://localhost:3000](http://localhost:3000) to view the app.