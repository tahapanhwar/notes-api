require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');


const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected')).catch((err) => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.get('/', (req, res) => {
    res.send('Api is running');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});