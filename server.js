const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//ajouter 
const OpenAI = require("openai");


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const formRoutes = require('./routes/FormRoutes');
const reponseRoutes = require('./routes/FormReponse');

const cors = require('cors');
dotenv.config();

const app = express();
//ajouter 
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_SECRET_KEY,
});

const port = process.env.PORT || 5000;
const dbURI = process.env.DB_URI;
app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from localhost:3000
}));




// view engine setup
// app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
//ajouter 
const conversationHistory = [
  { role: "system", content: "Vous êtes un assistant utile" }
];

app.post("/ask", async (req, res) => {
  const userMessage = req.body.message; 
  conversationHistory.push({ role: "user", content: userMessage });
  try {
    const completion = await openai.chat.completions.create({
      messages: conversationHistory,
      model: "gpt-3.5-turbo",
    });
    const botResponse = completion.choices[0].message.content; 
    res.json({ message: botResponse });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).send("Error generating response from OpenAI");
  }
});





app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/form', formRoutes);
app.use('/reponse', reponseRoutes);

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

