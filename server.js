const express = require('express')
const mongoose = require('mongoose')
const Timetable = require('./Models/timeTable');

const app = express()
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost/timeTimeGenerator', {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const table = await Timetable.find()
  res.render('index', { table : table })
})

app.post('/timeTable', async (req, res) => {
  await Timetable.create({ class: req.body.class, department: req.body.dept, course : req.body.course, room : req.body.room, instructor : req.body.instructor, meetingTiming : req.body.meetingTiming })

  res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`)
});