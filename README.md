# OTOT-E

# API

- `GET /api/task/all` - Retrieve a list of added tasks

# Redis

A redis server is hosted only on local machine and not on Google cloud as it is expense to do so.

# Caching

To test caching mechanism, you can go to `http://localhost:3000/api/task/all` and measure the time taken for server to return the task information to the browser. Then, refresh the page again and you will notice that it takes much lesser time. You can clear the cache by sending a get request to `http://localhost:3000/api//delete/cache/task`.

# Importing mock data

Go into the mongo db docker container and run the following command under the `/app/config` folder.

```
mongoimport --collection=tasks MOCK_DATA.json
```
