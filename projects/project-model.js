const db = require('../data/db-config.js');

module.exports = {
  find,
  findById,
  addAction,
  addProject,
};

function find() {
  return db('projects');
}

function findById(id) {
  return db('projects')
}

function addProject(project) {
  return db('projects')
}

function addAction(action) {
    return db('actions')
  }