const db = require('../data/db-config.js');

module.exports = {
  find,
  findProject,
  findActions,
  addAction,
  addProject,
};

function find() {
  return db('projects');
}

function findProject(id) {
    return db('projects')
    .where({ id })
    .then(project => {
        if (project) {
          return project;
        } else {
          return null;
        }
      });
}

function findActions(id) {
  return db('projects as p')
    .join('actions as a', 'p.id', '=', 'a.project_id')
    .select('a.id as id', 'a.action_description as description', 'a.notes as notes', 'a.completed')
    .where({ project_id: id })
    .then(actions => {
        if (actions) {
          return actions;
        } else {
          return null;
        }
      });
}

function addProject(project) {
  return db('projects')
  .insert(project)
  .then( (arrayOfIds) => {
    return findProject(arrayOfIds[0])
  })
}

function addAction(action, id) {
  return db('actions')
  .insert({...action, project_id: id})
  .then( (arrayOfIds) => {
      return findProject(arrayOfIds[0])
  })
}