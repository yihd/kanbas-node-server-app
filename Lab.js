const assignment = {
  id: 1, title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10", completed: false, score: 0,
};


const module = {
  id: "2", name: "Computer Science",
  description: "Basic Coding Fundation",
  course: "Python",
};


const todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];

const Lab5 = (app) => {
  
    app.get("/a5/welcome", (req, res) => {
      res.send("Welcome to Assignment 5");
    });
    app.get("/a5/add/:a/:b", (req, res) => {
      const { a, b } = req.params;
      const sum = parseInt(a) + parseInt(b);
      res.send(sum.toString());
    });
    app.get("/a5/subtract/:a/:b", (req, res) => {
      const { a, b } = req.params;
      const sum = parseInt(a) - parseInt(b);
      res.send(sum.toString());
    });
    app.get("/a5/assignment", (req, res) => {
      res.json(assignment);
    });
    app.get("/a5/assignment/title", (req, res) => {
      res.json(assignment.title);
    });
    app.get("/a5/assignment/title/:newTitle", (req, res) => {
      const { newTitle } = req.params;
      assignment.title = newTitle;
      res.json(assignment);
    });


    app.get("/a5/module", (req, res) => {
      res.json(module);
    });
    app.get("/a5/module/name", (req, res) => {
      res.json(module.name);
    });
    app.get("/a5/module/name/:newName", (req, res) => {
      const { newName } = req.params;
      module.name = newName;
      res.json(module);
    });

    app.get("/a5/todos", (req, res) => {
      const newTodo = {
        ...req.body,
        id: new Date().getTime(),
      };
      todos.push(newTodo);
      res.json(todos);
    });
    app.get("/a5/todos/create", (req, res) => {
      const newTodo = {
        id: new Date().getTime(),
        title: "New Task",
        completed: false,
      };
      todos.push(newTodo);
      res.json(todos);
    });// make sure to implement this BEFORE the /a5/todos/:id
    // route implemented below 
    // Otherwise :id path parameter would interpret the "create" in /a5/todos/create as an ID,
    
  
    app.get("/a5/todos/:id", (req, res) => {
      const { id } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      res.json(todo);
    });
    app.get("/a5/todos/:id/delete", (req, res) => {
      const { id } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      const todoIndex = todos.indexOf(todo);
      if (todoIndex !== -1) {
        todos.splice(todoIndex, 1);
      }
      res.json(todos);
    });
    // Updating an Item in an Array
    app.get("/a5/todos/:id/title/:title", (req, res) => {
      const { id, title } = req.params;
      const todo = todos.find((t) => t.id === parseInt(id));
      todo.title = title;
      res.json(todos);
    });
  
  
  
  
  
    app.get("/a5/calculator", (req, res) => {
      const { a, b, operation } = req.query;
      let result = 0;
      switch (operation) {
        case "add":
          result = parseInt(a) + parseInt(b);
          break;
          case "subtract":
            result = parseInt(a) - parseInt(b);
            break;
        case "multiply":
            result = parseInt(a) * parseInt(b);
            break;
        case "divide":
              // Additional check to prevent division by zero
          if (parseInt(b) === 0) {
              result = "Cannot divide by zero";
            } else {
              result = parseInt(a) / parseInt(b);
            }
            break;
        default:
          result = "Invalid operation";
      }
      res.send(result.toString());
    });
    
    
    
  
  };
  export default Lab5;


 