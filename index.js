require('dotenv').config()
const express = require('express')
const Recipe = require('./models/recipe')
const cors = require('cors')
const app = express()
app.use(express.json());
app.use(cors())


app.get('/', (request, response) => {  // home page
  response.send('<h1>Home Page</h1>')
})


app.get('/info', (request, response) => {
  Recipe.countDocuments({}).then((count) => {
    let htmlInfo = `
    <h4>Meal Planner has info for ${count} recipes</h4><br />
    ${new Date()}
    `

    response.send(htmlInfo)
  })
})






const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
