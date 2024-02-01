const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const path = require('path');

const url = 'mongodb://localhost/CrudDB';

const app = express();

app.use(cors()); 

mongoose.connect(url, { useNewUrlParser: true });

const con = mongoose.connection;

con.on('open', () => {
    console.log('connected...');
});

app.use(express.json());

const crudRouter = require('./routes/cruds');
app.use('/items', crudRouter);


app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    res.sendFile(indexPath);
});

app.use(express.static(path.join(__dirname, 'CrudJS')));

app.listen(9000, () => {
    console.log('Server started');
});
