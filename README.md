# CUPBOARDS

>We seem to always leave our grocery list at home, lose track of what's stored downstairs or buried in the deep freeze, or come across some item after it has expired and completely gone to waste.

"Cupboards" is a simple, React based, home inventory management application.

_This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)._

## Table of Contents

- [Setting up the App, API, and DB](#setting-up-the-app-api-and-db)
  - [Start MongoDB](#start-mongoDB)
  - [Clone/Run the API](#clonerun-the-api)
  - [Clone/Run the UI](#clonerun-the-ui)

- [Basic Functions](#basic-functions)
  - [Adding an item](#add-item)
  - [Modify an item](#modify-item)
  - [Delete an item](#delete-item)


## Setting up the App, API, and DB

### Start MongoDB

My database of choice for this project is [MongoDB](https://www.mongodb.com/).

In a terminal, run:
> `mongod`

### Clone/Run the API

Clone the Cupboards API from this repo: https://github.com/code-johnny-code/cupboards-api

The API also requires a `.env` file in the root folder with the following values (assuming you have your MongoDB configured to run on port `27017`):
> DB_URL=mongodb://localhost:27017/  
DB_NAME=cupboards-dev  
DB_COLLECTION=cupboard

In a terminal, run:
> `cd cupboards-api`  
`npm start`

### Clone/Run the UI

Clone the Cupboards UI from this repo: https://github.com/code-johnny-code/cupboards-ui

The API also requires a `.env` file in the root folder with the following values:
>REACT_APP_LIST_URL="https://localhost:4000/list"
REACT_APP_LOOKUP_URL="https://localhost:4000/lookup"  
REACT_APP_LOOKUP_KEY=
REACT_APP_ADD_URL="https://localhost:4000/add"
REACT_APP_DELETE_URL="https://localhost:4000/delete"

You should set the `REACT_APP_LOOKUP_KEY` to your [Walmart Open API key](https://developer.walmartlabs.com/). This is used for looking up product data via scanned UPCs.

In a terminal, run:
> `cd cupboards-ui`  
> `npm start`

Once this is all set up and running, you can access the app via https://localhost:3000