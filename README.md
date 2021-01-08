# Documentation

### Tang Ming Feng S10185023E ID Assignment 2
### This is the documentation for my ID Assignment 2 website. The website is a map website that finds out directions from point a to point b and helps users find a place to park nearby based on their current location. The users will need to allow the website to access their current location in order for it to work.
Note: derpsnow is also my account which is signed in on visual studio code

## Table of Contents
- [1] Purpose
- [2] Design Process
- [3] Features
- [4] Technologies used
- [5] Credits

      
## [1] Purpose

### User audience:
Car drivers or people looking for direcions to a destination.

### Intent:
Help drivers find a nearby place to park, give the driver the directions to the destinated car park, give directions from point a to point b

### Purpose:
Make finding a place to park easier, and make it easier to travel from point a to point b

### Who the website is catering for and value it provides for users:
Car drivers, makes finding parking easier, they can also find out the available lots left for each car park.
People who need directions, they can enter the destination into the map and will recieve directions to the destination from their current location.

### What is the website catering for?
The website is catering for a place where drivers can access information about car parks, and provide directions.

## [2] Design Process

I signed up for an API account key for LTA DataMall and using Postman and saved the response into "response.js". 
With the response, I could access the locations of the car parks in Singapore. Together with the mapbox api that determines the user's current location, the website will display all car parks within a certain area close to the current location.
To add more use to the website, I added a search function, which takes in an input from the user and outputs all car parks with the input in the name. e.g. input is "Yishun", so all car parks with yishun in the name will be outputed onto a table.
The design of the website is clear cut and simple, and the color scheme is kept tame, which makes using the web application less confusing.

The website is similar to google maps, but more centralized around parking, where users can access car park information from all around Singapore, and get directions from point a to point b.


### Link to repl.it
[repl.it](https://assignment2.mingfeng.repl.co/)
### Link to wireframe
[wireframe](https://github.com/tangmf/Assignment2/blob/main/Assignment2wireframe.pdf)

### User stories

* As a general user, I want to find directions from point A to point B. I can type in my current location or click on the marker on the map and then enter my destination. Hitting enter, I will get the directions from point A to point B. I can also select the various ways I can make the trip; traffic, walking, cycling.

* As a car driver, I need to find a place to park. Using the web application, I will allow the website to know my location, and from my location, the website will find out the nearest places to park. I can then copy the location of the car park I would like to park in, and paste it on the map as my destination. I can then click on my current location, which will generate a route between one location to the other. I can then have the directions to go to the car park.

* As a car driver, I would like to find out information about car parks in Singapore. I can go the Search Page and enter in the keyword of the Car Park I want to find out about . The website will then show the details of the car park. The details include carpark id, development, lot type, lot availability and location (in longitude,latitude).

## [3] Features

### All pages
* All pages have a responsive navigation bar made using bootstrap.
* All pages are responsive.

### Map page (index.html)
This page is where the user can find directions from point a to point b.
* mapbox map of the whole world, where buildings, streets, roads can be identified.
* navigation control on the map, which allows user to zoom in and out, and rotate about the axis.
* allows user to input a starting point and destination. The map can then generate directions from one point to the other.

### Find parking page (parking.html)
This page is where car drivers can find out the nearest car parks, and the information about them. Using the location outputed on the table, they can copy it and paste on the map destination, where the website can then generate directions to the car park.
* mapbox helps to get the user's current location
* map showing the current location via a marker, which makes it easy for the user to identify where they are
* using the current location, the website can find nearest car parks and arrange them in table form

### Search page (search.html)
This page is where users can find out information like carpark id, development, lot type, lot availability and location (in longitude,latitude) about car parks all over Singapore. The search function is not case sensitive.
* user can search for car park by development by input
* e.g. enter in "yishun" and all car parks with yishun in their name will be displayed on a table.

### Features to implement
* have the user be able to control the radius of the nearest car parks
* have the user be able to control the table output (user can choose to only have car parks with lot type "C" outputed etc.)
* dark mode for all pages. The button can be put at the top right
* give markers to the nearby car parks to make it easier to see which car park is nearer. This also enhances user experience
* have the website guess the users current location using mapbox geocoding

## [4] Technologies used
* html 
* css
* javascript
* jquery
* bootstrap
* Mapbox api
* LTA DataMall api
* postman

## [5] Credits

### Acknowledgements
* LTA DataMall Api: https://www.mytransport.sg/content/mytransport/home/dataMall.html, https://www.mytransport.sg/content/dam/datamall/datasets/LTA_DataMall_API_User_Guide.pdf
* Mapbox Api: https://www.mapbox.com/
* w3Schools: https://www.w3schools.com/js/default.asp
* BootStrap: https://getbootstrap.com/
* Mapbox youtube tutorial: https://www.youtube.com/watch?v=OySigNMXOZU
* Past CAs: https://repl.it/@mingfeng/wk08-ca-randomuser#script.js, https://repl.it/@mingfeng/wk08-simple-bootstrap#index.html
