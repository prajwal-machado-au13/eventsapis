import mongoose from 'mongoose'
/*
Event created by admin
event_name,startDate,endDate,status,price
*/

const eventsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
const Event = mongoose.model('Event', eventsSchema)

export default Event
