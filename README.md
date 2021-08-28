### BAKERY SHOP BBAKEND API

### ABOUT

An api for a bakery frontend webapp that serves data and handles CRUD operations
and user authentication

### TECHNOLOGIES:

    * cors
    * express
    * bcrypt
    * json web tokens
    * mongoose and mongodb
    * Google-Maps-React
    * short id

### FEATURES

    * Create New Products
    * Get Products
    * User Authentication
    * User authentication

### END POINTS

-   CREATE A PRODUCT

    -   Request

    `curl -X POST -H "Content-Type: application/json" \ -d '{"title": "Vanilla Cake", "description": "chocolate topping with vanilla", "image":"https://hips.hearstapps.com/clv.h-cdn.co/assets/cm/15/10/54f4a5df2e61b_-_gettyimages_182875449.jpg", "price": 2400, "availabeSizes": ["2kg", "4kg", "6kg", "8kg"]}' \ https://obscure-crag-41018.herokuapp.com/products`

    -   Response

    `{"availableSizes":[],"_id":"612a5d336ba57c0016627277","title":"Vanilla Cake","description":"chocolate topping with vanilla","image":"https://hips.hearstapps.com/clv.h-cdn.co/assets/cm/15/10/54f4a5df2e61b_-_gettyimages_182875449.jpg","price":2400,"__v":0}`

-   GET ALL PRODUCTS

    -   Request

    `curl -v https://obscure-crag-41018.herokuapp.com/products`

    -   Response

    `A list of all products in JSON format`

-   UPDATE PRODUCT DETAILS

    -   Request

    -   Response

-   DELETE PRODUCT

    -   Request

    `curl -X DELETE https://obscure-crag-41018.herokuapp.com/products/612a5d336ba57c0016627277`

    -   Response

    `JSON response deleted count = 1`

-   GET ALL ORDERS

    -   Request

    `curl -v https://obscure-crag-41018.herokuapp.com/orders`

    -   Response

    `A list of all orders made in JSON format`

-   DELETE ORDER

    -   Request

    -   Response

-   GET ALL CONTACT MESSAGES

    -   Request

    `curl -v https://obscure-crag-41018.herokuapp.com/contacts`

    -   Response

    `A list of all contact messages and users in JSON format`

### HOSTED @

[api_endpoint](https://obscure-crag-41018.herokuapp.com/)

### SETUP

    * git clone https://github.com/lumunge/Bakery-Backend-Api.git
    * npm i
    * npm start
