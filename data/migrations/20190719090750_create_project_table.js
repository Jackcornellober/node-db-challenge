

exports.up = function(knex) {
    return knex.schema
      .createTable('projects', tbl => {
        tbl.increments();
        tbl.text('name', 128)
          .unique()
          .notNullable();

        tbl.text('project_description')
          .notNullable();

        tbl.boolean('completed')
          .notNullable();
      })
      .createTable('actions', tbl => {
        tbl.increments();

        tbl.text('action_description')
          .notNullable();

        tbl.text('notes');

        tbl.boolean('completed')
          .notNullable();

        tbl.integer('project_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('projects')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('actions')
      .dropTableIfExists('projects');
  };
  
