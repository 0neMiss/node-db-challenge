
exports.up = function(knex) {
  return knex.schema
    .createTable('tasks', tbl =>{
      tbl.increments('id');
      tbl.string('description')
        .notNullable();
      tbl.string('notes');
      tbl.boolean('completed')
        .defaultTo(false)
        .notNullable();
    })
    .createTable('resources', tbl =>{
      tbl.increments('id');
      tbl.string('name')
        .notNullable();
      tbl.string('description');
    })
    .createTable('resources_tasks', tbl =>{
      tbl.integer('tasks_id')
        .notNullable()
        .unsigned()
        .references('tasks.id');
      tbl.integer('resources_id')
        .notNullable()
        .unsigned()
        .references('resources.id');
    })
    .createTable('projects', tbl=>{
      tbl.increments('id');
      tbl.string('name')
        .notNullable();
      tbl.string('description');
      tbl.boolean('completed')
        .defaultTo(false)
        .notNullable();
      tbl.integer('task_id')
        .notNullable()
        .unsigned()
        .references('resources_tasks.tasks_id');
      tbl.integer('resources_id')
        .notNullable()
        .unsigned()
        .references('resources_tasks.resources_id');
  })

};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('projects')
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources_tasks');
};
