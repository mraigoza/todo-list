# todo-list
A ToDo List using React and Flask where the user can add and delete todos while also persisting these upon browser close.

We store ToDo items inside a MongoDB

## Project Structure

Don't worry about the files that are not listed below, that means you won't need to use them

```
└── client                              # Contains all the front end (React) code
    ├── public                          # Some public files 
    └── src                             # Contains the JS src files
        ├── App.js                      # Main file that React renders for the TodoList component
        │── api.js                      # Contains functions to make get/post requests to backend
        └── components                  # Contains main TodoList.js
            ├── TodoList.js             # Renders todo-list and contains my add / delete functions
                                        # All non code related documents
├── server                              # Contains all the backend (Flask) code
    └── app.py                          # Main file that contains all my routes and database logic
```

