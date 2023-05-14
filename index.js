require('dotenv').config();
const path = require('path');

/* ---------- Express ---------- */

const express = require('express');
const cors = require('cors');
const routes = require('./app/routers');
const logger = require('./app/utils/logger');
const middlewares = require('./app/middlewares');

// const userMiddleware = require('./app/middleware/user');
// const adminMiddleware = require('./app/middleware/user');

const app = express();
const port = process.env.PORT || 5500;

/* ---------- Middlewares ---------- */

// On autorise tout les domaines à faire du Cross Origin Resource Sharing.
app.use(cors('*'));

// Middleware pour parser les body request en JSON
app.use(express.json());

app.use(express.static(path.join(__dirname, './public')));

// JUSTE AVANT LE ROUTEUR : on utilise un middleware pour vérifier l'état de l'utilisateur

// app.use(userMiddleware);
// app.use(adminMiddleware);

// Middleware de prévention des attaques XSS
app.use(middlewares.bodySanitizer);

routes(app);

/* ---------- App ---------- */

app.listen(port, () => {
  logger.log(`http://localhost:${port}`);
});
