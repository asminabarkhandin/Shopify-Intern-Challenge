# Shopify-Intern-Challenge
This is my project written using NodeJS and ExpressJS for backend, pure HTML/CSS and JavaScript for frontend.
The idea is a menu of a bakery, with two sections: Menu section which you can scroll and filter by category and/or name, and Admin section, where you can add, delete and update your items of the menu.

Unfortunately, I could not host my project, that is why in Installation and Description sections I refer to localhost link.  

## Installation
Download files from this repository, and in your directory run 
> ``` npm install ```
> >
it will install all packages needed.  

Also, you will find ```Menu.json``` file, which is a MongoDB database. To use this database, create ```project``` database and collection ```Menu``` in MongoDB Compass.  

![Mongo](/gifs/mongo.gif)  

Then on upper toolbar click ```Collection > Import```, and choose this ```Menu.json``` file.  

![Mongo](/gifs/jsonmongo.gif)  

To run the project, open command line in your directory and run
> node server.js
> >
it should show ```Server 3000 is listening```. Now go to your browser and go to ```localhost:3000/menu``` for Menu section and ```localhost:3000/admin``` for Admin section.  

## Description
We have two section: Menu and Admin. After we run ```node server.js``` in console, we can open browser and go to ```localhost:3000/menu``` and see  

![Menu](/gifs/menu.gif)  

In Menu section we have filter by name and category. We can search solely by category, solely by name or applying both filters.  

Example with one filter (category)  

![Menu](/gifs/category.gif)  

Example with both filters  

![Menu](/gifs/catname.gif)  

Now let's go to Admin section. Here we can change our catalog. We can  
1) Delete and Retrieve our items  

![Admin](/gifs/delret.gif)  

2) Create a new item  

![Admin](/gifs/create.gif)  

3) Update an existing item  

![Admin](/gifs/upd.gif)  

