const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  excercises: [
    {
      name: { type: String },
      type: { type: String },
      weight: { type: Number },
      sets: { type: Number },
      reps: { type: Number },
      duration: { type: Number },
      distance: { type: Number }
    },
  ],
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
