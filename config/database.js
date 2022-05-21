module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'AIDatas'),
      user: env('DATABASE_USERNAME', 'klang'),
      password: env('DATABASE_PASSWORD', 'klangisklang'),
    },
    debug: false,
  },
  settings: { forceMigration: false },
});
