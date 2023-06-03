require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const axios = require('axios');


SECRET_SESSION = process.env.SECRET_SESSION;


app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(flash());            // flash middleware

app.use(session({
  secret: SECRET_SESSION,    // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.use('/auth', require('./controllers/auth'));

// Add this below /auth controllers
app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
  res.render('profile', { id, name, email });
});

app.get('/', function (req, res) {
  axios.get('https://www.mmobomb.com/api1/latestnews')
    .then(function (response) {
      // handle success
      //console.log('response ---', response.data);
      return res.render('homePage', { news: response.data })
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again later.' });
    });
});

app.get('/games', function (req, res) {
  axios.get('https://www.mmobomb.com/api1/games')
    .then(function (response) {
      // handle success
      // console.log('response ---', response.data);
      return res.render('games', { games: response.data })
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again later.' });
    });
});

app.get('/games/genre/:category', function (req, res) {
  console.log('request here', req.params.category);
  axios.get(`https://www.mmobomb.com/api1/games?category=${req.params.category}`)

    .then(function (response) {
      return res.render('single-genre', { games: response.data })
    })
    .catch(function (error) {
      return res.json({ message: 'Data not found. Please try again later.' });
    });
});

app.get('/games/:id', function (req, res) {
  //console.log('request here', req.params.id);
  axios.get(`https://www.mmobomb.com/api1/game?id=${req.params.id}`)
    .then(function (response) {
      return res.render('single-game', { game: response.data })
    })
    .catch(function (error) {
      return res.json({ message: 'Data not found. Please try again later.' });
    });
});

app.get('/games-list', function (req, res) {
  //console.log('request here', req.params.id);
  axios.get('https://www.mmobomb.com/api1/games?sort-by=alphabetical')
    .then(function (response) {
      return res.render('games-list', { games: response.data })
    })
    .catch(function (error) {
      return res.json({ message: 'Data not found. Please try again later.' });
    });
});

app.get('/giveaways', function (req, res) {
  //console.log('request here', req.params.id);
  axios.get('https://www.mmobomb.com/api1/giveaways')
    .then(function (response) {
      return res.render('giveaways', { giveaways: response.data })
    })
    .catch(function (error) {
      return res.json({ message: 'Data not found. Please try again later.' });
    });
});


app.get('/help', function (req, res) {
  axios.get('https://www.mmobomb.com/api1/games')
    .then(function (response) {
      // handle success
      console.log('response ---', response.data);
      return res.render('helpPage', { games: response.data })
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again later.' });
    });
});
app.post('/help', function (req, res) {
  axios.get('https://www.mmobomb.com/api1/games')
    .then(function (response) {
      // handle success
      if (req.body.category === 'genre') {
        for (let i = 0; i < response.data.length; i++) {
          let games = response.data[i];
          if (games.genre === req.body.item) {
            return res.redirect(`/games/genre/${games.genre}`);
          }
        }
      } else if (req.body.category === 'platform') {
        for (let i = 0; i < response.data.length; i++) {
          let games = response.data[i];
          if (games.platform === req.body.item) {
            return res.redirect(`/games/genre/${games.genre}`);
          }
        }
      } else if (req.body.category === 'publisher') {
        for (let i = 0; i < response.data.length; i++) {
          let games = response.data[i];
          if (games.publisher === req.body.item) {
            return res.redirect(`/games/genre/${games.genre}`);
          }
        }
      } else if (req.body.category === 'developer') {
        for (let i = 0; i < response.data.length; i++) {
          let games = response.data[i];
          if (games.developer === req.body.item) {
            return res.redirect(`/games/genre/${games.genre}`);
          }
        }
      } else if (req.body.category === 'title') {
        for (let i = 0; i < response.data.length; i++) {
          let games = response.data[i];
          if (games.title === req.body.item) {
            return res.redirect(`/games/genre/${games.genre}`);
          }
        }
      }
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again later.' });
    });
});



app.get('/forums', function (req, res) {
  axios.get('https://www.mmobomb.com/api1/games')
    .then(function (response) {
      // handle success
      console.log('response ---', response.data);
      return res.render('forums', { games: response.data })
    })
    .catch(function (error) {
      res.json({ message: 'Data not found. Please try again later.' });
    });
});





const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
