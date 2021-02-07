# todo-list
A ToDo List using React and Flask where the user can add and delete todos while also persisting these upon browser close.

We store ToDo items inside a MongoDB

## Project Structure

Don't worry about the files that are not listed below, that means you won't need to use them

```
└── client                              # Contains all the front end (React) code
    ├── public                          # Some public files, don't need to touch this 
    └── src                             # Contains the JS src files that you will need to alter
        ├── App.js                      # Main file that React Renders, don't need to touch this as it renders the TodoList component that we give 
        │── api.js                      # Contains functions to make get/post requests to backend
        └── components                  # Contains main TodoList.js and you should add any other components you may use
            ├── TodoList.js             # Renders todo-list and your add / delete functions should be contained here, as well as displaying todo
                                        # All non code related documents
├── server                              # Contains all the backend (Flask) code
    └── app.py                          # Main file that will contain all your routes and database logic
```

