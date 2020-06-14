const db = require("../models");
const ObjectId = require("mongoose").Types.ObjectId;

module.exports = (app) => {
  // get all workouts
  app.get("/api/workouts", async (req, res) => {
    try {
      const allWorkouts = await db.Workout.find({}, async function (
        err,
        workouts
      ) {
        return workouts;
      });
      res.json(allWorkouts);
    } catch (err) {
      throw new Error("Unable to get all transaction data.");
    }
  });
  // create a new excercise
  app.post("/api/excercise", async (req, res) => {
    try {
      console.log("posting");
      const id = req.body.workoutID;
      const selectedWorkout = await db.Workout.findById(ObjectId(id));
      selectedWorkout.excercises.push({
        name: req.body.name,
        type: req.body.type,
        weight: req.body.weight,
        sets: req.body.sets,
        reps: req.body.reps,
        duration: req.body.duration,
        distance: req.body.distance,
      });
      await selectedWorkout.save();
      console.log("posting success:", selectedWorkout);
      res.send(selectedWorkout);
    } catch (err) {
      res.status(401).json(err);
    }
  });
  // create a new excercise
  app.post("/api/workout", async (req, res) => {
    try {
      console.log("post transaction");
      const newWorkout = await db.Workout.create(req.body)
        .then((dbUser) => {
          console.log("posted transaction");
        })
        .catch(({ message }) => {
          console.log(message);
        });
      console.log("new workout: ", newWorkout);
      res.json(newWorkout);
    } catch (err) {
      res.status(401).json(err);
    }
  });
  // get one transaction by id
  app.get("/api/transactions/:id", async (req, res) => {
    try {
      const oneTransaction = await db.Transaction.findOne({
        where: {
          id: req.params.id,
        },
        include: [db.User, db.Budget],
      });
      res.json(oneTransaction);
    } catch (err) {
      throw new Error("Unable to get single transaction data.");
    }
  });
};
