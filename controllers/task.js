const Task = require("../models/task");
const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URI
});

redisClient.on('error', (err) => {
  console.error(`An error occured when starting redis client: ${err}`);
});

redisClient.connect().then(() => {
  console.log('Successfilly connected to Redis!');
});

const deleteTaskCache = async function(req, res) {
  await redisClient.del('all-tasks');
  return res.status(200).send('Task cache deleted successfully!');
}

const retrieveAllTasks = async function(req, res) {
  const taskCache = await redisClient.get('all-tasks');
  if (taskCache) {
    const tasks = JSON.parse(taskCache);
    return res.status(200).json({ cacheStatus: 'Cache Hit', tasks });
  }

  try {
    // Fetch all tasks from database
    const tasks = await Task.find({});
    await redisClient.set('all-tasks', JSON.stringify(tasks));
    return res.status(200).json({ cacheStatus: 'Cache Miss', tasks });
  } catch (error) {
    console.log(`Error occured when fetching tasks. ${error}`);
    return res.status(500).send("Oops...we are unable to fetch tasks at the moment. Please try again later.");
  }
}

module.exports = {
  deleteTaskCache,
  retrieveAllTasks,
}