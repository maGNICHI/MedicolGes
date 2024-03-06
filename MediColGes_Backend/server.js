const express = require('express');
const app = express();
require('dotenv').config(); 
const db = require('./ConfigDB/connection');
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.listen(process.env.PORT, () => { 
  console.log('server started on port ' + (process.env.PORT));
});

db();

app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from localhost:3000
}));

app.use(express.json())

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/form', require('./FormManagement/routes/FormRoutes'));

