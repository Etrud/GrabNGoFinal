module.exports = {
  port: 8081,
  db: {
    database: process.env.DB_NAME || 'u224913284_GrabNGo',
    user: process.env.DB_USER || 'u224913284_admin',
    password: process.env.DB_PASS || '@o48RhdUd1L',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || '185.28.21.204'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
