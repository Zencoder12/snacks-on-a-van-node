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

2. COMMIT ID:

3. GENERAL ASSUMPTIONS:

a. For each route, we have implemented some validation on the object send in the body of the request. We are also validating mongoose ID objects to avoid incurring in rejected promises.

b. Error handlings - The routes are not wrapped in try and catch block because we are using THE npm module express-async-errors to handle that. Also, to handle rejected promises not related to express and uncaught errors we are using a custom error middleware coupled together with the process object error handling method.

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
Example: https://the-bald-figthers.herokuapp.com/customers/607ff864f388c7314bdb0479/menu

> input & output image example

<p align="center">
  <img src="postman_imgs/view_menu_input&output_example.png"  width="300" >
</p>

## Code Implementation

You can include a code snippet here.

```HTML
<!--
Example code from: https://www.w3schools.com/jsref/met_win_alert.asp
__>

<!DOCTYPE html>
<html>
<body>

<p>Click the button to display an alert box.</p>

<button onclick="myFunction()">Try it</button>

<script>
function myFunction() {
  alert("Hello! I am an alert box!");
}
</script>

</body>
</html>
```

## Adding Images

You can use images/gif hosted online:

<p align="center">
  <img src="https://github.com/Martin-Reinoso/sandpit-Profile/raw/main/Images_Readme/01.gif"  width="300" >
</p>

Or you can add your own images from a folder in your repo with the following code. The example has a folder `Gifs` with an image file `Q1-1.gif`:

```HTML
<p align="center">
  <img src="Gifs/Q1-1.gif"  width="300" >
</p>
```

To create a gif from a video you can follow this [link](https://ezgif.com/video-to-gif/ezgif-6-55f4b3b086d4.mov).

You can use emojis :+1: but do not over use it, we are looking for professional work. If you would not add them in your job, do not use them here! :shipit:

**Now Get ready to complete all the tasks:**

- [x] Read the Project handouts carefully
- [x] User Interface (UI)mockup
- [ ] App server mockup
- [ ] Front-end + back-end (one feature)
- [ ] Complete system + source code
- [ ] Report on your work(+ test1 feature)
