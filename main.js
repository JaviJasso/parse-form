const express = require("express")
const mustacheExpress = require("mustache-express")
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")
//const data = require("./data")

let todoList = []
let otherList = []
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// Use the middleware (i.e plugin) for static files
// and tell express they are in the 'public' folder
app.use(express.static("public"))
app.use(expressValidator())

app.engine("mst", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mst")

app.get("/", (request, response) => {
  response.render("home", { todoList: todoList })
})

// listens for a post request at the "action" /todo
app.post("/", (request, response) => {
  request.checkBody("todo", "No Items Added").notEmpty() //Aprende mas!! notEmpty
  const newTodo = request.body.todo
  // todoList.push(newTodo)
  console.log("kiubo")

  const errors = request.validationErrors()

  if (errors) {
    response.send("Nothing To Do")
  } else {
    todoList.push(request.body.todo)
    response.redirect("/")
  }
})

//otherList
app.get("/", (request, response) => {
  response.render("home", { otherList: otherList })
})

app.post("/t", (request, response) => {
  request.checkBody("todo", "No Items Added").notEmpty() //Aprende mas!! notEmpty
  const newTodo = request.body.todo
  // todoList.push(newTodo)
  console.log("kiubo")

  const errors = request.validationErrors()
})

app.listen(3000, () => {
  console.log("Listening on port 3000")
})
