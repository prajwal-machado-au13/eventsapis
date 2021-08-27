import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.conn.js'

import userRoutes from './routes/users.routes.js'
import eventRoutes from './routes/events.routes.js'

import {
  notFound,
  errorHandler,
  handleValidationError,
} from './middlewares/error.middleware.js'

dotenv.config()
connectDB()

const app = express()

app.use(express.json({ limit: '30mb', type: 'application/json' }))

app.get('/', (req, res) => {
  res.send('health check route')
})

app.use('/api/user', userRoutes)
app.use('/api/event', eventRoutes)

app.use(notFound)
app.use(handleValidationError)
app.use(errorHandler)

const PORT = process.env.PORT || 8080

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port number ${PORT}`
      .brightMagenta
  )
)
