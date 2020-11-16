module.exports = {
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "docker",
  database: process.env.DB_DATABASE || "app-db",
  extra: { insecureAuth: true },
  entities: [
    "./src/models/*.ts"
  ],
  migrations: [
    "./src/database/migrations/*.ts"
  ],
  cli: {
    migrationsDir: "./src/database/migrations"
  }
}
