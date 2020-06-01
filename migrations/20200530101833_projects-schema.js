
exports.up = function(knex) {
  return knex.schema
    .createTable('resources', tbl =>{
      tbl.increments('id');
      tbl.string('name')
        .notNullable();
      tbl.string('description');
    })
    .createTable('projects', tbl=>{
      tbl.increments('id');
      tbl.string('name')
        .notNullable();
      tbl.string('description');
      tbl.boolean('completed')
        .defaultTo(false)
        .notNullable();
  })
  .createTable('tasks', tbl =>{
    tbl.increments('id');
    tbl.string('description')
      .notNullable();
    tbl.string('notes');
    tbl.boolean('completed')
      .defaultTo(false)
      .notNullable();
    tbl.integer('project_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('projects');
  })
  // .createTable('resources_tasks', tbl =>{
  //   tbl.integer('tasks_id')
  //     .notNullable()
  //     .unsigned()
  //     .references('tasks.id');
  //   tbl.integer('resources_id')
  //     .notNullable()
  //     .unsigned()
  //     .references('resources.id');
  // })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('projects')
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks');
};
