# `Videogame database app`


## What it includes
Various data from 100's of games. Including, but not limited to,
minimum game specs, release dates, titles, genre's, etc.


### User Model
A user model was created to give the user access to the webpage, and have details on each game the website has access to.


### Default Routes
Home `/`
Featured Games `/games`
Games List `/games-list`
Live Giveaways  `/giveaways`
Forums `/forums`
Search/Help `/help`

## Wireframes
- ![excalidraw](/images/Screenshot%202023-06-07%20at%202.37.26%20AM.png)

This was my original framework, and I have ended up creating several other view pages for other routes. I have used `ejs`, `js`, `css`, `node`,`psql`, and `Sequelize` to build this project out. Having to learn CRUD and applying different logic for each route was a challenge, and overall this project was very enjoyable to take on.


## `1` Fork & Clone Project & Install Dependencies
`1` The first thing that we are going to do is `fork` and `clone`

`2` Now we are going to install the current dependencies that are listed inside of `package.json`
```text
npm install
```

`3` We need to install some packages that will be used for `authentication`. Those are the following packages:

```text
npm install bcryptjs connect-flash passport passport-local express-session method-override
```
-  [bcryptjs](https://www.npmjs.com/package/bcryptjs): A library to help you hash passwords. ( [wikipedia](https://en.wikipedia.org/wiki/Bcrypt) ) 
    - Blowfish has a 64-bit block size and a variable key length from 32 bits up to 448 bits.
- [connect-flash](https://github.com/jaredhanson/connect-flash): The flash is an area of the session used for storing messages that will be used to to display to the user. Flash is typically used with redirects.
- [passport](https://www.passportjs.org/docs/): Passport is authentication middleware for Node.js. It is designed to do one thing authenticate requests. There are over 500+ strategies used to authenticate a user; however, we will be using one - *passport-local* Passport is authentication middleware for Node. It is designed to serve a singular purpose: authenticate requests
- [passport-local](http://www.passportjs.org/packages/passport-local/): The local authentication strategy authenticates users using a username and password. The strategy requires a verify callback, which accepts these credentials and calls done providing a user. [passport-local](http://www.passportjs.org/packages/passport-local/)
- [express-session](https://github.com/expressjs/session): Create a session middleware with given *options*.
- [method-override](https://github.com/expressjs/method-override): Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

You must have your port and server running in order to view the page locally. Otherwise use the site on the deployed webpage:

# Final Notes:
Id like to mention this was a challenging feat. I do admit that I had plenty of trouble getting the routes configuration to work effectively. The post/put/delete routes were an interesting tackle. Im enjoing the journey of becoming well versed in programming, but theres so much room for improvement. My ideas for this project are still blossoming, and I believe the app will get to the point where I feel its optimization wont need much more editing/programming.

- If you have any ideas or recommendations, please let me know..

-[Github](github.com/Epaiva14)

## Credits

I have used other peoples artwork and images for the designes for the webpage. Thanks and credit to those who have ownership to the images and templates.

- logo from freepngimg.com
- background from wallpapersafari.com
- all routes have templates from bulmatemplates.github.io