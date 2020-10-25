let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let expressSession = require("express-session");
let passport = require('passport');
let root = require('app-root-path');

let auctionRouter = require('./routes/auction');
let loginRouter = require('./routes/login');
let userRouter = require('./routes/user');
let userDataRouter = require('./routes/data/user');
let fileDataRouter = require('./routes/data/file');
let auctionDataRouter = require('./routes/data/auction');
let pictureDataRouter = require('./routes/data/picture');

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public/', express.static(path.join(__dirname, 'public')));
app.use(expressSession({
    secret: "lr3 is secret. Too secret",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', loginRouter);
app.use('/', auctionRouter);
app.use('/', userRouter);
app.use('/data/', userDataRouter);
app.use('/data/', fileDataRouter);
app.use('/data/', auctionDataRouter);
app.use('/data/', pictureDataRouter);

app.use('*', (req, res) => {
   res.status(404);
   res.sendFile(path.join(root.path, '/public/html/404/404.html'));
});

module.exports = app;
