require('dotenv').config();

const express = require('express');
const cors = require('cors');

const {dbConnection} = require('./database/config');

//server express
const app = express();

//cors
app.use(cors());

//middlewares
app.use(express.json());

//db
dbConnection();

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));



app.listen(process.env.PORT, () => {
    console.log("app corriendo")
})