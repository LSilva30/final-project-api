const mongoose = require('mongoose')
const Schema = mongoose.Schema  // Schema becomes the variable used to create the schema


const WorkoutSchema = new Schema(     // naming the new schema "workoutSchema"
  {
    level: { type: String, required: true },
    workouts: { type: Array, required: true },
  }
)

const Workout = mongoose.model('Workout', WorkoutSchema)  // first parameter is where its find the collection 'workouts' in our database (Mongoose automatically looks for the plural, lowercased version of your model name: so "workouts" collection). then we pass the 2nd parasmeter is our Schema
module.exports = Workout