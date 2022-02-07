# mern-ecommerce

> Frontend-> React JS

> Backend-> Node JS & Express JS

> Database-> MongoDB

## Installation process
1. #### install npm packages
    1. install backend packages
    ```bash
    cd backend
    npm install
    ```
    2. install frontend packages
    ```bash
    cd frontend
    npm install
    ```
2. <b> Go to the backend </b> folder of ecommerce & create .env for connection, PORT, NODE_ENV, MONGO_URL and JWT_KEY.
    
    ##### sample code for backend .env
    ```env
   PORT = 5000
   NODE_ENV= development
   MONGO_URL = 'mongodb://localhost/ecommerce'
   JWT_KEY = YOUR KEY
    ```
3. <b>deploy this project</b> on your local server by using this command
    ```bash
    cd backend
    npm run both
    ```
    #### note: both backend & frontend server will start at once with the above command.
    
### App Description:
    1. user can view all products
    2. user can view single product
    3. user can add to cart checkout products.
    4. user can register & sign in
    5. admin can view ordered products
    6. admin can change the status of a product (processing, shipped, delivered, etc.)
