/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Diagnosis', (table) => {
        table.increments();
        table.integer('UserId').unsigned().notNullable().index();
        table.foreign('UserId').references('User.id');
        table.integer('DiagnosisId').notNullable();
        table.string('Name', 100);
        table.string('Accuracy', 100);
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Diagnosis');
};
