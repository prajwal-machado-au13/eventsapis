import asyncHandler from 'express-async-handler'
import Event from '../models/event.js'

/*
@desc    Create a product
@route   POST /api/products
@access  Private/Admin */

const createEvent = asyncHandler(async (req, res) => {
  const { name, startDate, endDate, status, price } = req.body
  const event = new Event({
    name: name,
    startDate: startDate,
    endDate: endDate,
    status: status,
    price: price,
    user: req.user._id,
  })

  const createdEvent = await event.save()
  res.status(201).json(createdEvent)
})

/*
@route update a product
@desc PUT /api/products/:id
@access Private/Admin
 */
const updateEvent = asyncHandler(async (req, res) => {
  const { name, startDate, endDate, status, price } = req.body

  const event = await Event.findById(req.params.id)

  if (event) {
    event.name = name
    event.price = price
    event.startDate = startDate
    event.endDate = endDate
    event.status = status

    const updatedEvent = await event.save()
    res.json(updatedEvent)
  } else {
    res.status(404)
    throw new Error('Event not found')
  }
})

const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params
  const event = await Event.findById(id)
  if (event) {
    await event.remove()
    res.json(event)
  } else {
    res.json(404)
    throw new Error('Event not found')
  }
})

export { updateEvent, createEvent, deleteEvent }
