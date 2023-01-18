# nodets-asana

Code assessment test for Asana integration for Getlynx.co

## Project Structure

```
src--
    │   app.ts
    │   routes.ts
    │   server.ts
    │
    ├───controllers
    │       asanaController.ts
    │
    ├───models
    │   └───asana
    │           requestConfig.ts
    │           taskModel.ts
    │           workspaceData.ts
    │
    ├───services
    │       asanaService.ts
    │
    └───utils
            axisoUtils.ts
            commonUtils.ts
            responseUtil.ts
```

## Requirements:

```
Nodejs >= 14.x.x (Recommended 9.x.x)
MongoDB >= 6.x.x
```

## Installation:

```
git clone https://github.com/vykanand/nodets-asana.git
cd nodets-asana
npm install
```

## Development:

Start the backend server

```
npm start
```

Note: The default Port for the server is 3333

## How REST APIS Work?

->Please create Personal Access token for using the Api following the instructions here.
https://developers.asana.com/docs/personal-access-token

->All the Requests will need this token in the Request Header as Bearer whenever you send a request to the server.

```
Basic Example:
curl -H "Authorization: Bearer 1/451927151853254:34ed86c235488f168ac3077b8a050c8f"

```

There are 3 rest apis

1. REST API to get all workspaces which are present in asana.
   Get info of all your workspaces

```
GET
http://localhost:3333/projects
```

Note - To fetch cached Projects data from DB pass caching=allowed

```
GET
http://localhost:3333/projects?caching=allowed
```

2. REST API to get all tasks based on the project id
   Pass the projectID to fetch all the related tasks related to a project

```
GET
http://localhost:3333/tasks/:projectID
```

Note - To fetch cached Tasks data from DB pass caching=allowed

```
GET
http://localhost:3333/tasks/:projectID?caching=allowed
```

3. REST API to can mark a task complete
   You can Pass the taskID which you want to mark as complete

```
Patch
http://localhost:3333/completetask
```

Parameters Required (JSON Format) -{"taskID":"1132697072393356"}

---

You can find POSTMAN Collection for this project in the file :

```
node-asana-postman.json
```

## Running Tests.

Tests for this project can be run via command

```
npm run test
OR
npm run test:watch
```
