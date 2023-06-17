// 載入 express 並建構應用程式伺服器
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const app = express()
const PORT = 3000
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// setting body-parser 改寫成 express，也可以直接取得 
app.use(express.urlencoded({ extended: true }))
//設定首頁路由
app.get('/', (req, res) => {
  res.send('hello world')
})
//設定新頁面路由
app.get('/todos/new', (req, res) => {
  res.render('new')
})
app.post('/todos', (req, res) => {
  res.send('hello world')
})
//設定特定資料路由
app.get('/todos/:id', (req, res) => {
  res.render('detail')
})
//設定修改資料路由
app.get('/todos/:id/edit', (req, res) => {
  res.render('edit')
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
  res.send('register')
})
//設定登出路由
app.get('/users/logout', (req, res) => {
  res.send('logout')
})
// 設定 port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})