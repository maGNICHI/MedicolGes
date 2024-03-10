const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const formRoutes = require('./routes/FormRoutes');
const formReponse = require('./routes/FormReponse');

const cors = require('cors');
dotenv.config();

const app = express();

const port = process.env.PORT || 5000;
const dbURI = process.env.DB_URI;
app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from localhost:3000
}));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/form', formRoutes);
//---------------------- Connecting to MongoDB --------------------------//
mongoose.connect(dbURI)
.then(() => {
  console.log('Connected to database');

  // app.use('/formRep', formReponse);



})

//---------------- Server Listening -----------------------------//
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

