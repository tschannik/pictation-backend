const dotenv = require('dotenv');
const fs = require('fs');
const rimraf = require('rimraf');

dotenv.config({
  path: `${process.env.NODE_ENV || 'development'}.env`,
});

rimraf('ormconfig.json', error => {
  const ormConfig = {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: ['src/**/*.{entity,view}.ts'],
    migrations: ['src/migrations/**/*.ts'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  };

  fs.writeFileSync('ormconfig.json', JSON.stringify(ormConfig));
});
