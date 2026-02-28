const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes');
const managerRoutes = require('./routes/managerRoutes');

const app = express();
app.use(bodyParser.json());

// MongoDB connection mongodb://localhost:27017/
mongoose.connect('mongodb://localhost:27017/admin_manager_db')
.then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/admin', adminRoutes);
app.use('/manager', managerRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));