// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();
const indexDia = require('./router/indexdia');
const userRoutes = require('./router/usersRuta');
const moodRoutes = require('./router/moodRuta');
const sleepRoutes = require('./router/sleepRuta');
const meditationRoutes = require('./router/meditationRuta');
const completedMeditationsRoutes = require('./router/completedMeditationsRuta');




// Middleware
app.use(cors({
    origin: '*', // Cambiar ['http://tu.com', 'http://yo.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
    credentials: true // Habilita el envío de credenciales si es necesario
  }));


// Middleware para parseo de solicitudes
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));


// Rutas
app.use('/', indexDia);
app.use('/api/users', userRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/sleep', sleepRoutes);
app.use('/api/meditations', meditationRoutes);
app.use('/api/completed-meditations', completedMeditationsRoutes);



// Exportar app para testing
const PORT = 3000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
}

module.exports = app;