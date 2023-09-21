require('dotenv').config()
const knexConfig = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '12345678',
      database: 'facebookd6',
    },
    pool: { min: 0, max: 10 },
    useNullAsDefault: true,
  },
}

module.exports = {
  knexConfig,
}
