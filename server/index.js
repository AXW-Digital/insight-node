const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
var session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const keys = require('./config/keys');


// Models
require('./models/User');
require('./models/Profile');
require('./models/Settings');
require('./models/Surveys');

// Services
require('./services/passport');

// Env
require('dotenv').config();


mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(
    session({
        secret: [keys.cookieKey],
        resave: true,
        rolling: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000
        }
    }),
)

app.use(passport.initialize());
app.use(passport.session());

// Routes
require('./routes/authRoutes')(app);
require('./routes/surveyRoute')(app);
require('./routes/settingsRoute')(app);
require('./routes/profileRoute')(app);
require('./routes/leaderboardRoute')(app);
require('./routes/voucherRoute')(app);
require('./routes/cardRoute')(app);
require('./routes/contentRoute')(app);
require('./routes/socialsRoute')(app)
require('./routes/healthCheckRoute')(app)

const PORT = process.env.PORT || 5050;
app.listen(PORT);
