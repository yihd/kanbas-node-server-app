// import db from "../Database/index.js";
import * as dao from "./dao.js";

export default function Users(app) {
  const createUser = async (req, res) => {
    try {
      // Attempt to create a user with the provided details from request body
      const user = await dao.createUser(req.body);
  
      
  
      // Send back the created user as JSON
      res.json(user);
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error creating user:', error);
  
      // Check if it's a duplicate key error (specific to MongoDB, adjust based on your database if different)
      if (error.code === 11000) {
        // Send a conflict error code and a message about the duplication
        res.status(409).send('Error: User with the given details already exists.');
      } else {
        // Send a generic server error response
        res.status(500).send('Internal Server Error');
      }
    }
  };
  

  const findAllUsers = async (req, res) => {
    const { role } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }

    const wer = await dao.findAllUsers();
    res.json(wer);
  };
  // app.post("/api/users/register", async(req, res) => {
  //   const {username, password} = req.body;
  //   const existingUser = await dao.findUserByCredentials(username, password);
  //   if (existingUser){
  //     res.status(400).send("Username already exists");
  //     return;
  //   }
  //   const newUser = dao.createUser({username, password});
  //   req.session["currentUser"] = newUser;
  //   res.send(newUser);

  // })

  app.get("/api/users/:userId", async (req, res) => {
    const userId = req.params.userId;
    const user = await dao.findUserById(userId);
    res.send(user);
  });//http://localhost:4000/api/users/6610b53e0216779429a46140
  app.get("/api/users/username/:username", async (req, res) => {
    const username = req.params.username;
    console.log(username);
    const user = await dao.findUserByUsername(username);
    res.send(user);
  });
  app.get(
    "/api/users/username/:username/password/:password",
    async (req, res) => {
      const { username, password } = req.params;
      console.log(username);
      const user = await dao.findUserByCredentials(username, password);
      res.send(user);
    }
  );

  const register = async (req, res) => {
    const { username, password, firstName, lastName } = req.body;
    const user = await dao.findUserByUsername(username);
    // const user = await db.users.find((user) => user.username === username);
    if (user) {
      res.send(400);
      return;
    }
    // try {
    console.log("[0] Creating user");
    const newUser = await dao.createUser({ username, password, firstName, lastName });
    req.session["currentUser"] = newUser;
    res.send(newUser);
    // console.log("[1] Creating user");
    // // db.users.push(newUser);
    // res.send(200);
    // } catch (error) {
    //   res.send(400);
    // }
    // }
  };
  const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);
    // db.users.find(
    //   (user) => user.username === username && user.password === password
    // );
    if (user) {
      req.session["currentUser"] = user;
      res.send(user);
    } else {
      res.send(401);
    }
  };
  const logout = (req, res) => {
    req.session.destroy();
    res.send("User logged out");
  };
  const profile = async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };
 
  
  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const status = await dao.updateUser(userId, req.body);
    res.json(status);
  };
  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const createdUser = await dao.createUser(req.body);
    req.session.currentUser = createdUser;
    res.json(createdUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const user = await dao.findUserByCredentials(username, password);
    if (user) {
      req.session.currentUser = user;
      res.json(user);
    } else {
      res.sendStatus(401);
    }
  };
  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };
  
  

  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.post("/api/users/register", register);
  app.post("/api/users/login", login);
  app.post("/api/users/logout", logout);
  app.post("/api/users/profile", profile);
  app.put("/api/users/:userId", updateUser);
  app.get("/api/users/:userId", findUserById);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  // app.post("/api/users/profile", profile);
}