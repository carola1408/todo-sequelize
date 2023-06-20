// 載入 express 並建構應用程式伺服器
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const bcrypt = require('bcryptjs')
const app = express()
const db = require('./models')
const Todo = db.Todo
const User = db.User
const routes = require('./routes')
// 載入Passport設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
const PORT = 3000
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
//樣板引擎指定為 Handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
// setting body-parser 改寫成 express，也可以直接取得 
app.use(express.urlencoded({ extended: true }))
app.use(routes)
// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})



// 設定 port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})