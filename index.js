const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const PORT = process.env.PORT == null ? 5000 : process.env.PORT;
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use(bodyParser.json());

app.use(cors());

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
if (!db) console.log('Error connecting db');
else console.log('Db connected successfully');

const stateRouter = require('./src/routes/stateRoute');

app.use('/api', stateRouter);

app.get('/', (req, res) => res.send('Hello World with Express'));

app.listen(PORT, () => {
    console.log(`connected to ${PORT}`);
});
