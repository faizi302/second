const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path=require('path');

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, './my-app/dist')));

app.use('/api/contact', require('./routes/contact'));

app.get('*', function(req,res){
    res.sendFile(path.json(__dirname, './my-app/dist/index.html'));
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
