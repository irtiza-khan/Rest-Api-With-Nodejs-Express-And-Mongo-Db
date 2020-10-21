require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const subscriberRoutes = require('./routes/subscriber');


mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((conn) => {
        console.log(`Mongo Db Connected to ${conn.connection.host}`);
    })
    .catch(err => console.error(err))

app.use(morgan('tiny'));


//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/subscribers', subscriberRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Port listening on https://localhost:${PORT}`));