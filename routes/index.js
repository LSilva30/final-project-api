const router = require('express').Router()
const Workout = require('../model/workoutSchema')

router.get('/', (req, res) => {
  res.status(200).json({msg: 'Hey from backend'})
})

router.post('/workouts', (req, res) => {
  const levelFromFrontend = req.body.level 
  
  Workout.findOne({ level: levelFromFrontend })
  .then((foundLevel) => {
    res.send(foundLevel.exercise)
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

  Workout.findOne({ level })
  .then(foundWorkout => {
    foundWorkout.exercise.find((exerc) => {
      if(exerc.name === workout.name) {
        res.status(400).send({message: `Workout with name ${workout.name} already exists`})
        return true
      } else {
        foundWorkout.exercise.push(workout)
        foundWorkout.save()
        res.status(200).send({message: `Successfully created a new exercise for level ${level}`, workout })
        return true
      }
    })
  })
})

module.exports = router
