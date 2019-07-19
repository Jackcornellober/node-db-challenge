const express = require('express');

const Projects = require('./project-model.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const projects = await Projects.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get projects' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Projects.findProject(id);
    const actions = await Projects.findActions(id)

    if (project && actions) {
      res.json({...project[0], actions: actions});
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' })
    }
  } catch (err) {
      console.log(err)
    res.status(500).json({ message: 'Failed to get projects' });
  }
});

router.post('/', async (req, res) => {
  const projectData = req.body;

  try {
    const project = await Projects.addProject(projectData);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new project' });
  }
});

router.post('/:id/actions', async (req, res) => {
  const actionData = req.body;
  const { id } = req.params; 

  try {
    const project = await Projects.findProject(id);

    if (project) {
      const action = await Projects.addAction(actionData, id);
      res.status(201).json(action);
    } else {
      res.status(404).json({ message: 'Could not find project with given id.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to create new action' });
  }
});

///STRETCH///

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    try {
      const project = await Projects.findProject(id);
  
      if (project) {
        const updatedProject = await Projects.updateProject(changes, id);
        res.json(updatedProject);
      } else {
        res.status(404).json({ message: 'Could not find project with given id' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to update project' });
    }
  });

  router.put('/actions/:id', async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    try {
      const action = await Projects.findAction(id);
  
      if (action) {
        const updatedAction = await Projects.updateAction(changes, id);
        res.json(updatedAction);
      } else {
        res.status(404).json({ message: 'Could not find action with given id' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to update action' });
    }
  });

  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleted = await Projects.removeProject(id);
  
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find project with given id' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete project' });
    }
  });


  
  router.delete('/actions/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deleted = await Projects.removeAction(id);
  
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find action with given id' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete action' });
    }
  });


module.exports = router;