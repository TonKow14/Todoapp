require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const redis = require('redis')
const methodOverride = require('method-override')
const ms = require('ms')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./configs/usePassport')
const RedisStore = require("connect-redis").default


const redisClient = redis.createClient({ url: process.env.REDIS_URL })
const redisStore = new RedisStore({
  client: redisClient
})

redisClient.connect().catch(console.error)

const optionSession = {
  store: redisStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  rolling: true,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: ms('3d')
  }
}

const app = express()

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session(optionSession))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(require('./middlewares/alertGlobal')) // alert flash message global
app.use('/public', express.static(path.join(__dirname, './public')))


// Routers
app.use('/', require('./routers/index'))
app.use('/auth', require('./routers/auth'))
app.use('/profile', require('./routers/profile'))


const startApp = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port http://localhost:${process.env.PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

startApp()
