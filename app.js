let express = require('express')
let path = require('path')
let router = require('./router.js')
let bodyParser = require('body-parser')
let session = require('express-session')
const cookieParser = require('cookie-parser')
let app = express()


app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

app.set('views', path.join(__dirname, './views/'))
app.engine('html', require('express-art-template'))

app.use(session({
	secret: 'guige',
	resave: false,
	saveUninitialized: true 
}))


app.use(router)
app.use(function (req, res) {
	res.render('404.html')
})

app.use(function (err, req, res, next) {
	res.status(500).json({
		err_code: 500,
		message: err.message
	})
})

app.listen(80, function (err) {
	console.log('80 is running')
})