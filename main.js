const express = require("express")
const mustacheExpress = require("mustache-express")
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")
const expressSession = require("express-session")
const jsonfile = require("json-file")

//const data = require("./data")

const app = express()

app.use(
  expressSession({
    secret: "Telefunka",
    resave: false,
    saveUninitialized: true
  })
)

app.use(bodyParser.urlencoded({ extended: false }))
//Extended will always be false unless you are using it for photos
// Use the middleware (i.e plugin) for static files
// and tell express they are in the 'public' folder

app.use(bodyParser.json())

// app.use(express.static("public"))
// app.use(expressValidator())

app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")

// let todoList = []    This 2 variables were cooment out in order to use Sessions
// let completeList = []

app.get("/", (request, response) => {
  // response.render("home", { todoList: todoList, completeList: completeList
  const todoList = request.session.todoList || []

  const templateData = {
    uncompleted: todoList.filter(todo => !todo.completed),
    completed: todoList.filter(todo => todo.completed)
  }
  response.render("home", templateData)
})

// listens for a post request at the "action" /todo
app.post("/addTodo", (request, response) => {
  const todoList = request.session.todoList || []

  const newTodo = request.body.description
  // todoList.push(newTodo)
  console.log("kiubo")

  // const errors = request.validationErrors()

  // if (errors) {
  //   response.send("Nothing To Do")
  // } else {
  //   todoList.push(request.body.todo)
  // }

  // This madeness below need explanation FIGURE IT OUT BOY!
  todoList.push({
    id: todoList.length + 1,
    completed: false,
    description: newTodo
  })

  request.session.todoList = todoList // follow up on this phase Javi
  response.redirect("/")
})

app.post("/isComplete", (request, response) => {
  // request.checkBody("todo", "No Items Added").notEmpty() //Aprende mas!! notEmpty
  // const newTodo = request.body.description
  // // todoList.push(newTodo)
  // console.log("kiubo")
  //
  // completeList.push(newTodo)

  const todoList = request.session.todoList || []

  const id = parseInt(request.body.id)

  const todo = todoList.find(todo => todo.id === id)
  if (todo) {
    todo.completed = true
    // todo.when = new Date()

    request.session.todoList = todoList
  }

  // This madeness below need explanation FIGURE IT OUT BOY!
  // Follow up with instructor for further explanation
  // const indexOf = todoList.indexOf(newTodo)
  // todoList.splice(indexOf, 1)
  response.redirect("/")
})

app.listen(3000, () => {
  console.log("Listening on port Agent 3000")
})
