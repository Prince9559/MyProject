const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');

dotenv.config();

const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const taskRoutes = require('./routes/tasks');

const app = express();
app.use(express.json());
app.use(cors());

 
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);
const accessLogStream = fs.createWriteStream(path.join(logsDir, 'access.log'), { flags: 'a' });

 
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/tasks', taskRoutes);

 
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use((err, req, res, next) => {
  console.error('Global error:', err.stack || err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL connected.');
    await sequelize.sync({ alter: true });
    console.log('DB synced.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Unable to start server:', err);
    process.exit(1);
  }
})();
