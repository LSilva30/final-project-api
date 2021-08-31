const mongoose = require('mongoose')
const Schema = mongoose.Schema


const WorkoutSchema = new Schema(
  {
    level: { type: String, required: true },
    exercise: { type: Array, required: true },
  }
)

const Workout = mongoose.model('Workout', WorkoutSchema)
module.exports = Workout