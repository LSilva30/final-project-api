const router = require('express').Router()
const Workout = require('../model/workoutSchema')   // importing the schema

router.get('/', (req, res) => {
  res.status(200).json({msg: 'Hey from backend'})
})

router.post('/workouts', (req, res) => {
  const levelFromFrontend = req.body.level    // grabbing request when experience button from frontend is clicked -> then going into body --> grabbing the level from it and assigning it into variable "levelFromFrontEnd"
  Workout.findOne({ level: levelFromFrontend }) // when the level from the front end is grabbed, match it to whichever level it is to our database
  .then((foundWorkout) => {                   // then assign that level into a variable "foundWorkout"
    res.send(foundWorkout.workouts)           // foundWorkout.workout goes into the levels 'workouts' from our DB and sends it to the front end
  })
})

module.exports = router