require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'changeme',
  paykentaToken: process.env.PAYKENTA_TOKEN || ''
};
