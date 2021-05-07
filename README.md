**The University of Melbourne**

# INFO30005 – Web Information Technologies

# Group Project Repository

Welcome!

We have added to this repository a `README.md`, `.gitignore`, and `.gitattributes`.

- **README.md**: is the document you are currently reading. It should be replaced with information about your project, and instructions on how to use your code in someone else's local computer.

- **.gitignore**: lets you filter out files that should not be added to git. For example, Windows 10 and Mac OS create hidden system files (e.g., .DS_Store) that are local to your computer and should not be part of the repository. This files should be filtered by the `.gitignore` file. This initial `.gitignore` has been created to filter local files when using MacOS and Node. Depending on your project make sure you update the `.gitignore` file. More information about this can be found in this [link](https://www.atlassian.com/git/tutorials/saving-changes/gitignore).

- **.gitattributes**: configures the line ending of files, to ensure consistency across development environments. More information can be found in this [link](https://git-scm.com/docs/gitattributes).

Remember that _"this document"_ can use `different formats` to **highlight** important information. This is just an example of different formating tools available for you. For help with the format you can find a guide [here](https://docs.github.com/en/github/writing-on-github).

## Table of contents

- [Team Members](#team-members)
- [General Info](#general-info)
- [Technologies](#technologies)
- [Code Implementation](#code-implementation)
- [Adding Images](#adding-images)

## Team Members

| Name                   | Student ID |          Task          |  State  |
| :--------------------- | :--------: | :--------------------: | :-----: |
| Felipe Leefu Huang Lin |  1202652   |  Front End & Back End  | Working |
| Jiajing Zhou           |  1067985   |  Front End & Back End  | Working |
| Wenqian Zhou           |  1067812   |  Front End & Back End  | Working |
| Yueting Zhang          |  1084806   | UI Mock Up & Front End | Working |
| Shenlan Bei            |   957661   | UI Mock Up & Back End  | Working |

## General info

1. LIVE WEBSITE URL: https://the-bald-figthers.herokuapp.com/

2. COMMIT ID: 72d474db30b09a2300cbed137a26ff36ec04cf80

3. ATLAS ACCESS:

- username: fleefuhuangl@student.unimelb.edu.au
- password: info3005

4. GENERAL ASSUMPTIONS:

a. For each route, we have implemented some validation on the object send in the body of the request. We are also validating mongoose ID objects to avoid incurring in rejected promises.

b. Error handlings - The routes are not wrapped in try and catch block because we are using the npm module express-async-errors to handle that. Also, to handle rejected promises not related to express and uncaught errors we are using a custom error middleware coupled together with the process object error handling method.

c. We are assuming that in the final version of the app, customer ID and vendor ID will be extracted from the JSON web token for added security. However, because up to this point the authorization functionality is not yet implemented, we are passing the customer ID and vendor ID information through the URL paths as a parameter to assist in the queries.

d. Images – to represent the pictures in the view menu of snacks the route is returning the string representation of the image id from the website unsplash, which in the front-end will be used to link to the website and retrieve the image.

## Technologies

Project is created with:

- NodeJs v14.15.3
- config v3.3.6
- dotenv v8.2.0
- express v4.17.1
- express-async-errors v3.1.1
- joi v17.4.0
- joi-objectid v3.0.1
- mongoose v5.12.5
- nodemon v2.0.7

## Postman Instructions

1. View menu of snacks (including pictures and prices)

Request Type: GET

Request Format: domain/customers/customerId/menu

Request Example: https://the-bald-figthers.herokuapp.com/customers/607ff864f388c7314bdb0479/menu

> Pre-populated customer IDs in the database for testing (params):

<p align="center">
  <img src="postman_imgs/userCustomers.png"  width="600" >
</p>

> input & output image example

<p align="center">
  <img src="postman_imgs/view_menu_input&output_example.png"  width="600" >
</p>

---

2. View details of a snack

Request Type: GET

Request Format: domain/customers/customerId/product/productId

Request Example: https://the-bald-figthers.herokuapp.com/customers/607ff864f388c7314bdb0479/product/60801147f388c7314bdb047a

> Pre-populated customer IDs in the database for testing (params):

<p align="center">
  <img src="postman_imgs/userCustomers.png"  width="600" >
</p>

> Pre-populated product IDs in the database for testing (params):

<p align="center">
  <img src="postman_imgs/products.png"  width="600" >
</p>

> input & output image example

<p align="center">
  <img src="postman_imgs/view_product_details_input&output_example.png"  width="600" >
</p>

---

3. Customer starts a new order by requesting a snack

Request Type: POST

Request Format: domain/customers/customerId/new-order

Request Example: https://the-bald-figthers.herokuapp.com/customers/607ff864f388c7314bdb0479/new-order

> Pre-populated customer IDs in the database for testing (params):

<p align="center">
  <img src="postman_imgs/userCustomers.png"  width="600" >
</p>

> Pre-populated vendor IDs in the database for testing (body):

<p align="center">
  <img src="postman_imgs/vendors.png"  width="600" >
</p>

> input image example

<p align="center">
  <img src="postman_imgs/new_order_input_example.png"  width="600" >
</p>

Comments: orderItems will be extracted from the browser local storage, processed by the client app and send in as the format in the image example, therefore we are not linking to the productId.

> output image example

<p align="center">
  <img src="postman_imgs/new_order_output_example.png"  width="600" >
</p>

---

4. Setting van status (vendor sends location, marks van as ready-for-orders)

Request Type: PATCH

Request Format: domain/vendors/vendorId/set-location

Request Example: https://the-bald-figthers.herokuapp.com/vendors/608017b3f388c7314bdb0483/set-location

> Pre-populated vendor IDs in the database for testing (params):

<p align="center">
  <img src="postman_imgs/vendors.png"  width="600" >
</p>

> input image example

<p align="center">
  <img src="postman_imgs/set_location_input_example.png"  width="600" >
</p>

> output image example

<p align="center">
  <img src="postman_imgs/set_location_output_example.png"  width="600" >
</p>

---

5. Show list of all outstanding orders

Request Type: GET

Request Format: domain/vendors/vendorId/outstanding-orders

Request Example: https://the-bald-figthers.herokuapp.com/vendors/608018b9f388c7314bdb0484/outstanding-orders

> Pre-populated vendor IDs in the database for testing (params):

<p align="center">
  <img src="postman_imgs/vendors.png"  width="600" >
</p>

> Pre-populated order IDs in the database for testing:

<p align="center">
  <img src="postman_imgs/orders_1.png"  width="600" >
</p>
<p align="center">
  <img src="postman_imgs/orders_2.png"  width="600" >
</p>

> input image example

<p align="center">
  <img src="postman_imgs/outstanding_orders_input_example.png"  width="600" >
</p>

> output image example

<p align="center">
  <img src="postman_imgs/outstanding_orders_output_example.png"  width="600" >
</p>

---

6. Mark an order as "fulfilled" (ready to be picked up by customer)

Request Type: PATCH

Request Format: domain/vendors/vendorId/orderId/set-fulfill

Request Example: https://the-bald-figthers.herokuapp.com/vendors/608018b9f388c7314bdb0484/60801ed2cb86ee00151e5f9c/set-fulfill

> Pre-populated vendor IDs in the database for testing (params):

<p align="center">
  <img src="postman_imgs/vendors.png"  width="600" >
</p>

> Pre-populated order IDs in the database for testing (params):

<p align="center">
  <img src="postman_imgs/orders_1.png"  width="600" >
</p>
<p align="center">
  <img src="postman_imgs/orders_2.png"  width="600" >
</p>

> input image example

<p align="center">
  <img src="postman_imgs/setfulfilled_input_example.png"  width="600" >
</p>

> output image example

<p align="center">
  <img src="postman_imgs/setfulfilled_output_example.png"  width="600" >
</p>

## DELIVERABLE 3 INFORMATION

1. Login Details

There are 2 ways to login to the application. Create a new user on the Register table. After creating the user you will be automatically be logged in and redirected to the menu page.

The second option is to use the already created profile with the below information:
USERNAME: Lionelm@barcelonafc.com
PASSWORD: 1234melbourne

---

2. Order Snacks

If the users is not logged the user is redirected to an error page. To be able to confirm the order the user must be logged in.

Because the vendor information is not implemented and to create an order the route must receive a vendor ID to continue with the request we have hard coded the vendorID in the client send request.

VendorID: 608018b9f388c7314bdb0484

3. Order Details

Unfortunately the group didn't had enough time before the deadline passed to implement the order display completely. However the connection with the backend is working in case the teaching team wants to test.

Please see the picture below.

<p align="center">
  <img src="postman_imgs/deliverable_3_get_orders_backend.png"  width="600" >
</p>

For that a "x-auth-token" header with a jwtoken must be provided. Below is a dummy token which can be used.

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDk1MzE5MjI2ZGU5ODAwMTUyNTNhY2QiLCJmaXJzdE5hbWUiOiJMaW9uZWwiLCJlbWFpbCI6Ikxpb25lbG1AYmFyY2Vsb25hZmMuY29tIiwiaWF0IjoxNjIwMzkzMjM5fQ.BI83MyXuch0k5hrtGZvY-lSI4Sy0AxPPxWRKijGq6AY

4. URL

front-end: https://secure-badlands-10230.herokuapp.com/
back-end: https://the-bald-figthers.herokuapp.com/

5. REPOS

front-end: https://github.com/INFO30005-2021-SM1/project-frontend-t13-thebaldfighters
comitID: 598c15080ed9a09ab729d6b0f0740cfcf43908db

back-end: https://github.com/INFO30005-2021-SM1/project-t13-thebaldfighters
commitID: f2a3b91647079e43bfb648dec11112cc1bbd44bf
