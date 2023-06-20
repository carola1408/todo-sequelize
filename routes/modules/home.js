// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const db = require('../../models')
// 定義首頁路由

router.get('/', (req, res) => {
  //查詢多筆資料是 findAll()，如果不帶參數，會預設撈出整張表的資料。
  return Todo.findAll({
    raw: true,
    nest: true
  })
    .sort({ _id: 'asc' }) // 新增這裡：根據 _id 升冪排序
    .then((todos) => { return res.render('index', { todos: todos }) })
    .catch((error) => { return res.status(422).json(error) })
})
// 匯出路由模組
module.exports = router