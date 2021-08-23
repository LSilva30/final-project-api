const router = require('express').Router()
const Workout = require('../model/workoutSchema')   // importing the schema

router.get('/', (req, res) => {
  res.status(200).json({msg: 'Hey from backend'})
})

router.post('/workouts', (req, res) => {
  const levelFromFrontend = req.body.level    // grabbing request when experience button from frontend is clicked -> then going into body --> grabbing the level from it and assigning it into variable "levelFromFrontEnd"
  
  Workout.findOne({ level: levelFromFrontend }) // when the level from the front end is grabbed, match it to whichever level it is to our database
  .then((foundLevel) => {                   // then assign that level into a variable "foundLevel"
    res.send(foundLevel.exercise)           // foundLevel.exercise goes into the levels 'exercise' from our DB and sends it to the front end
  })
})

router.patch('/workouts/:level/:exerciseName', (req, res) => {
  const { level, exerciseName } = req.params
  const { completed } = req.body
  Workout.findOneAndUpdate({ level: level, "exercise.name": exerciseName }, 
    { $set: { "exercise.$.completed": completed } })
    .then((docRef) => res.send(docRef))
})

router.post('/workouts/create', (req, res) => {
  const { workout, level } = req.body
  console.log('This is the body from the POST request', req.body)

  Workout.findOne({ level })
  .then(foundWorkout => {
    foundWorkout.exercise.find((exerc) => {
      if(exerc.name === workout.name) {
        res.status(400).send({message: `Workout with name ${workout.name} already exists`})
        return true
      } else {
        console.log('This is the workout found by the level in the DB', foundWorkout)
        foundWorkout.exercise.push(workout)
        foundWorkout.save()
        res.status(200).send({message: `Successfully created a new exercise for level ${level}`, workout })
      }
    })
  })
})

router.post('workouts/delete', (req, res) => {
  const { workoutName, level } = req.body
  console.log('This is the body from the POST request', req.body)

  Workout.findOne({ level })
  .then(foundWorkout => {
    foundWorkout.exercise.find((exerc, index) => {
      if(exerc.name === workoutName) {
        foundWorkout.splice(index, 1)
        res.status(200).send({message: `Successfully deleted ${workoutName} from ${level}`})
      } else {
        res.status(400).send({message: `Workout with name ${workout.name} doesnt exists`})
        return true
      }
    })
  })
})

module.exports = router