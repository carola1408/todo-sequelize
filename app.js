// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars')
// const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const app = express()
const db = require('./models')
const Todo = db.Todo
const User = db.User
const PORT = 3000
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
//樣板引擎指定為 Handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
// app.use(bodyParser.urlencoded({ extended: true }))
// setting body-parser 改寫成 express，也可以直接取得 
app.use(express.urlencoded({ extended: true }))

//設定 Todo 首頁路由
app.get('/', (req, res) => {
  //查詢多筆資料是 findAll()，如果不帶參數，會預設撈出整張表的資料。
  return Todo.findAll({
    raw: true,
    nest: true
  })
    .then((todos) => { return res.render('index', { todos: todos }) })
    .catch((error) => { return res.status(422).json(error) })
})

//設定新頁面路由
app.get('/todos/new', (req, res) => {
  return res.render('new')
})

//資料庫新增資料
app.post('/todos', (req, res) => {
  const name = req.body.name  // 從 req.body 拿出表單裡的 name 資料
  return Todo.create({ name })    // 存入資料庫
    .then(() => res.redirect('/')) // 新增完成後導回首頁
    .catch(error => console.log(error))
})
//設定特定資料路由
app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})
//設定修改資料路由
app.get('/todos/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findOne({ where: { id } })
    .then(todo => res.render('edit', { todo: todo.get() }))
    .catch(error => console.log(error))
})
app.post('/todos/:id', (req, res) => {
  const id = req.params.id
  const { name, isDone } = req.body
  return Todo.findOne({ id })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})
//設定刪除資料路由
app.post('/todos/:id/delete', (req, res) => {
  const id = req.params.id
  res.send('hello world')
})
//設定登入路由
app.get('/users/login', (req, res) => {
  res.render('login')
})

app.post('/users/login', (req, res) => {
  res.send('login')
})
//設定註冊路由
app.get('/users/register', (req, res) => {
  res.render('register')
})

app.post('/users/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.create({ name, email, password })
    .then(user => res.redirect('/'))
})
//設定登出路由
app.get('/users/logout', (req, res) => {
  res.send('logout')
})
// 設定 port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})