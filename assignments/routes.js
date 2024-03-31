import Database from "../Database/index.js";
import assignments from "../Database/assignments.js";
import db from "../Database/index.js";

export default function Courses(app) {
  
  app.get("/api/assignments", (req, res) => {
    res.send(db.assignments);
  });
  // Read one course by id
  app.get("/api/assignments/:id", (req, res) => {
    const id = req.params.id;
    const assignment = db.courses.find((a) => a._id === id);
    if (!assignment) {
      return res.status(404).send("Assignment not found");
    }
    res.send(assignment);
  });
  // Create a new course


  app.put("/api/assignments/:id", (req, res) => {
    const { id } = req.params;
    const assignment = req.body;
    Database.assignments = Database.assignments.map((a) =>
      a._id === id ? { ...a, ...assignment } : a
    );
    res.sendStatus(204);
  });
// Create a new assignment
  app.post("/api/assignments", (req, res) => {
    const assignment = { ...req.body, _id: Date.now().toString() };
    db.assignments.push(assignment);
    res.send(assignments);
  });

  app.delete("/api/assignments/:id", (req, res) => {
    const id = req.params.id;
    const assignmentIndex = db.assignments.findIndex((a) => a._id === id);
    if (assignmentIndex === -1) {
      return res.status(404).send("Course not found");
    }
    db.assignments.splice(assignmentsIndex, 1);
    res.send(db.assignments);
  });

}