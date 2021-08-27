// import dotenv from 'dotenv'
// dotenv.config()
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

function handleValidationError(err, req, res, next) {
  if (err.name !== 'ValidationError') return next(err)

  res.status(400).json({ error: err._message, errorDetails: err.errors })
}

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

export { notFound, errorHandler, handleValidationError }
