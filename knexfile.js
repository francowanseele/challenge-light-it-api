const { sql } = require('./config');

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: sql.server,
            port: sql.port,
            user: sql.user,
            password: sql.password,
            database: sql.database,
        },
        migrations: {
            directory: __dirname + '/data/migrations',
        },
        seeds: {
            directory: __dirname + '/data/seeds',
        },
    },

    // staging: ...

    // production: ...
};
