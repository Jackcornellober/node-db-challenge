const db = require('../data/db-config.js');

module.exports = {
  find,
  findProject,
  findAction,
  findActions,
  addAction,
  addProject,
  updateProject,
  removeProject,
  updateAction,
  removeAction
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

function findAction(id) {
    return db('action')
    .where({ id })
    .then(action => {
        if (action) {
          return action;
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

///STRETCH///

function updateProject(changes,id) {
    return db('projects')
      .where({ id: id })
      .update( changes )
      .then( (ifUpdated) => {
          if (ifUpdated) {
              return findProject(id)
          } else {
              return null
          }
      })
  }
  
  function removeProject(id) {
    const deletedProject = findProject(id)
    return db('projects')
      .where({ id: id })
      .del()
      .then ( (ifDeleted) => {
          if (ifDeleted) {
              return deletedProject
          } else {
              return null
          }
      })
  }

  function updateAction(changes,id) {
    return db('actions')
      .where({ id: id })
      .update( changes )
      .then( (ifUpdated) => {
          if (ifUpdated) {
              return findAction(id)
          } else {
              return null
          }
      })
  }
  
  function removeAction(id) {
    const deletedAction = findAction(id)
    return db('actions')
      .where({ id: id })
      .del()
      .then ( (ifDeleted) => {
          if (ifDeleted) {
              return deletedAction
          } else {
              return null
          }
      })
  }