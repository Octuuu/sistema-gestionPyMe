require('dotenv').config();
const app = require('./app');
const sequelize = require('./database');
const models = require('./models');

const PORT = process.env.PORT || 4000;

sequelize.sync({ force: false }).then(() => {
  console.log('📦 Base de datos sincronizada');
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});
