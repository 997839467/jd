// 新建话题、删除话题、修改话题、查看话题列表。。。。
var express = require('express')
var md5 = require('blueimp-md5')
var Topic = require('../models/topic.js')

var router = express.Router()

var User = require('../models/user.js')
// 其实很好理解，登录，注册，首页都是要渲染的，至少先都来个get就完事了
router.get('/', function (req, res, next) {
	Topic.find(function (err, data) {
		if (err) {
			return next(err)
		}
		// 这样就做到了，每六条数据为一个分界点，分出一个页码
		// 把总页码数一个一个的转成i的123456..然后输入数组作为页码
		let pageCode = []
		var index = Math.ceil(data.length / 6)
		for(var i = 1; i < index; i++) {
			pageCode.push(i)
		}
		data = data.slice(0, 6)
		res.render('../views/index.html', {
			topic: data,
			pageCode: pageCode
		})
	})
})


router.get('/topic/new', function(req, res) {
    res.render('../views/topic/new.html')
})

router.post('/topic/new', function(req, res) {
	var body = req.body
	new Topic.save({
		title: body.title,
		article: body.article,
		worte_time: body.worte_time
	}, function (err) {
		if (err) {
			return next(err)
		}
		res.status(200).json({
			err_code: 0,
			err_message: '发表的话题保存成功'
		})
	})
})

router.get('/topic/123', function(req, res) {
    res.render('../views/topic/show.html')
})

module.exports = router