require('dotenv').config()
const express = require('express')
const Recipe = require('./models/recipe')
const User = require('./models/user')
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
    <h4>Meal Planner has info for ${count} recipes</h4>
    ${new Date()}
    `

    response.send(htmlInfo)
  })
})


app.get('/api/recipes', (request, response) => {  // get all recipes
  Recipe.find({}).then(recipes => {
    response.json(recipes)
  })
})


app.post('/api/recipes', (request, response) => {  // add a recipe
  const body = request.body

  if ((body.name || body.ingredients || body.steps || body.preparationTime) === undefined) {
    return response.status(400).json({ error: 'content missing'})
  }

  const recipe = new Recipe({
    name: body.name,
    ingredients: body.ingredients,
    steps: body.steps,
    preparationTime: body.preparationTime
  })

  recipe.save().then(savedRecipe => {
    response.json(savedRecipe)
  })
})


app.delete('/api/recipes/:id', (request, response) => {
  Recipe.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
