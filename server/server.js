const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log('Middleware received cookie:', req.cookies['auth-cookie']);
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(uploadDir));

app.use(routes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "..", 'client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "..", 'client/dist/index.html'));
  });
}

db.once('open', () => {
  app.listen(PORT, () => console.log(`API server running on port ${PORT}!`));
});
