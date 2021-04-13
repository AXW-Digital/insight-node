const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const keys = require('./config/keys');


// Models
require('./models/User');
require('./models/Profile');
require('./models/Settings');
require('./models/Surveys');

// Services
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 2 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    }),
)
app.use(passport.initialize());
app.use(passport.session());

// Routes
require('./routes/authRoutes')(app);
require('./routes/surveyRoute')(app);
require('./routes/settingsRoute')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
