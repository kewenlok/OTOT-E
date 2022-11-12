// Initialize express router
const router = require('express').Router();
const { retrieveAllTasks, addTask, deleteTask, updateTask, deleteTaskCache } = require('../controllers/task');

router.route('/task/all').get(retrieveAllTasks);

router.route('/delete/cache/task').get(deleteTaskCache);

module.exports = router;