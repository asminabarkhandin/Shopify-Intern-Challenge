# Shopify-Intern-Challenge
This is my project written using NodeJS and ExpressJS for backend, pure HTML/CSS and JavaScript for frontend.
The idea is a menu of a bakery, with two sections: Menu section which you can scroll and filter by category and/or name, and Admin section, where you can add, delete and update your items of the menu.

Unfortunately, I could not host my project, that is why in Installation section I refer to localhost link.
## Installation
Download files from this repository, and in your directory run 
> ``` npm install ```
> >
it will install all packages needed.  
Also, you will find ```Menu.json``` file, which is a MongoDB database. To use this database, create ```project``` database and collection ```Menu``` in MongoDB Compass. Then on upper toolbar click ```Collection > Import```, and choose this ```Menu.json``` file.

To run the project, open command line in your directory and run
> node server.js
> >
it should show ```Server 3000 is listening```. Now go to your browser and go to ```localhost:3000/menu``` for Menu section and ```localhost:3000/admin``` for Admin section.
