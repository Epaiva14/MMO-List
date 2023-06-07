require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const axios = require('axios');
const { post, game } = require('./models');
const methodOverride = require('method-override');

SECRET_SESSION = process.env.SECRET_SESSION;


app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
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
      res.render('no-result');
    });
});

app.get('/games', isLoggedIn, function (req, res) {
  axios.get('https://www.mmobomb.com/api1/games')
    .then(function (response) {
      // handle success
      // console.log('response ---', response.data);
      return res.render('games', { games: response.data })
    })
    .catch(function (error) {
      res.render('no-result');
    });
});

app.get('/games/genre/:category', isLoggedIn, function (req, res) {
  console.log('request here', req.params.category);
  axios.get(`https://www.mmobomb.com/api1/games?category=${req.params.category}`)

    .then(function (response) {
      return res.render('single-genre', { games: response.data })
    })
    .catch(function (error) {
      res.render('no-result');
    });
});

app.get('/games/:id', isLoggedIn, function (req, res) {
  //console.log('request here', req.params.id);
  axios.get(`https://www.mmobomb.com/api1/game?id=${req.params.id}`)
    .then(function (response) {
      return res.render('single-game', { game: response.data })
    })
    .catch(function (error) {
      res.render('no-result');
    });
});

app.get('/games-list', isLoggedIn, function (req, res) {
  //console.log('request here', req.params.id);
  axios.get('https://www.mmobomb.com/api1/games?sort-by=alphabetical')
    .then(function (response) {
      return res.render('games-list', { games: response.data })
    })
    .catch(function (error) {
      res.render('no-result');
    });
});

app.get('/giveaways', isLoggedIn, function (req, res) {
  //console.log('request here', req.params.id);
  axios.get('https://www.mmobomb.com/api1/giveaways')
    .then(function (response) {
      return res.render('giveaways', { giveaways: response.data })
    })
    .catch(function (error) {
      res.render('no-result');
    });
});

app.get('/help', isLoggedIn, function (req, res) {
  axios.get('https://www.mmobomb.com/api1/games')
    .then(function (response) {
      // handle success
      //console.log('response ---', response.data);
      return res.render('helpPage', { games: response.data })
    })
    .catch(function (error) {
      res.render('no-result');
    });
});

app.post('/help', isLoggedIn, function (req, res) {
  axios.get('https://www.mmobomb.com/api1/games')
    .then(function (response) {
      // handle success
      if (req.body.category === 'genre') {
        for (let i = 0; i < response.data.length; i++) {
          let games = response.data[i];
          // console.log('where is the error', games.genre);
          // console.log('where is the error',);
          if (games.genre.toLowerCase() === req.body.item.toLowerCase().split(' ').join('-')) {
            //console.log('what does the string say', req.body.item);
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
      } else if (req.body.category === 'title') {
        for (let i = 0; i < response.data.length; i++) {
          let games = response.data[i];
          if (games.title === req.body.item) {
            return res.redirect(`/games/${games.id}`);
          }
        }
      } else {
        return res.json({ message: 'No matching items' });
      }
    })
    .catch(function (error) {
      res.render('no-result');
    });
});

app.get('/forums', isLoggedIn, function (req, res) {
  post.findAll()
    .then(posts => {
      // handle successxs
      //console.log('WOOOOOOOOOOOO');
      //console.log('WOOOOOOOOOOOO, posts);
      return res.render('forums', { posts })
    })
    .catch(function (error) {
      console.log(error);
      res.render('no-result');
    });
});

app.get('/forums/post', isLoggedIn, function (req, res) {
  axios.get('https://www.mmobomb.com/api1/games')
    .then(function (response) {
      // handle success
      //console.log('response ---', response.data);
      return res.render('forum-post')
    })
    .catch(function (error) {
      res.render('no-result');
    });
});

app.get('/forums/edit/:id', isLoggedIn, function (req, res) {
  post.findOne({
    where: { id: parseInt(req.params.id) }
  })
    .then(foundPost => {
      foundPost = foundPost.toJSON();
      console.log('what is this??', foundPost);
      return res.render('edit', { post: foundPost });
    })
    .catch(function (error) {
      console.log(error);
      res.render('no-result');
    })
})

app.post('/forums', isLoggedIn, function (req, res) {
  //console.log(req.user.dataValues.id, req.body);
  const postData = { ...req.body }
  postData.title = req.body.title
  postData.content = req.body.content
  postData.userId = req.user.dataValues.id
  post.create(postData)
    .then(response => {
      //console.log('what is the response', response)
      res.redirect('/forums')
    })
    .catch(function (error) {
      console.log('Error', error);
      res.render('no-result');
    });
});

app.put('/forums/edit/:id', isLoggedIn, function (req, res) {
  const postData = { ...req.body }
  postData.title = req.body.title
  postData.content = req.body.content
  postData.userId = req.user.dataValues.id
  post.update(postData, {
    where: { id: parseInt(req.params.id) }
  })
    .then(updatedPost => {
      console.log('what post got updated?', updatedPost);
      res.redirect('/forums')
    })
    .catch(err => {
      console.log('Error', err);
      res.render('no-result')
    });
})

app.delete('/:id', isLoggedIn, function (req, res) {
  post.destroy({
    where: { id: parseInt(req.params.id) }
  })
    .then(postDeleted => {
      console.log('what post got deleted?', postDeleted);
      res.redirect('/forums');
    })
    .catch(err => {
      console.log('Error', err);
      res.render('no-result')
    });
})


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
