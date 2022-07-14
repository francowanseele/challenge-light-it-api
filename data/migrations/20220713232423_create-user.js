/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('User', (table) => {
        table.increments();
        table.string('Name', 100);
        table.string('Lastname', 100);
        table.string('Email', 100);
        table.string('Password', 100);
        table.boolean('Male');
        table.dateTime('BirthDate');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('User');
};
