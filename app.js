require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 3030;


const app = express();

//Middleware
app.use(cors());
//Allows data to be converted to json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Route import
const postsRoute = require('./routes/posts');
const foodsRoute = require('./routes/foods');
const daysRoute = require('./routes/days');
const authRoute = require('./routes/auth');

app.use('/foods', foodsRoute);
app.use('/days', daysRoute);
app.use('/posts', postsRoute);
app.use('/user', authRoute);

//routing
app.get('/', (req,res) => {
    res.send('We are on home');
});



//Database connection
mongoose.connect(process.env.MY_DB_CONNECTION,
                 { useNewUrlParser: true },
                 () => console.log('connected to db'));

//listening
app.listen(3030);