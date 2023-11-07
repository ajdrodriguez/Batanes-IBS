const express = require("express");
const router = express.Router();
const Booking = require("../models/booking")
const moment = require("moment")
const Room = require("../models/room")
const stripe = require('stripe')('sk_test_51O7sXhHWjCPgSPZmYLRh5B33iOlJg1INZNHeKnHw9zddq4tU5DrxBHdb5MirdGrQosFKdYgBCibQAlqSLLYXMu08003v8vMJsJ')
const { v4: uuidv4 } = require('uuid');

router.post("/bookroom", async (req, res) => {

    const { room, userID, fromDate, toDate, totalDays, totalAmount, token } = req.body

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const payment = await stripe.charges.create(
            {
                amount: totalAmount * 100,
                customer: customer.id,
                currency: 'PHP',
                receipt_email: token.email
            }, {
            idempotencyKey: uuidv4()
        }
        )

        if (payment) {

            const newBooking = new Booking({
                room: room.name,
                roomID: room._id,
                userID,
                fromDate: moment(fromDate).format('MM-DD-YYYY'),
                toDate: moment(toDate).format('MM-DD-YYYY'),
                totalDays,
                totalAmount,
                transactionID: '1234'
            })

            const booking = await newBooking.save()
            const roomTemp = await Room.findOne({ _id: room._id })
            roomTemp.currentBookings.push({
                bookingID: booking._id,
                fromDate: moment(fromDate).format('MM-DD-YYYY'),
                toDate: moment(toDate).format('MM-DD-YYYY'),
                userID: userID,
                status: booking.status
            })
            await roomTemp.save()
        }
        res.send('Payment Successfully, your reservation is booked.')
    } catch (error) {
        return res.status(400).json({ error })
    }
});

router.post("/getbookingsbyuserid", async (req, res) => {
    const userID = req.body.userID

    try {
        const bookings = await Booking.find({ userID: userID })
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error })
    }
})

router.post("/cancelbooking", async (req, res) => {
    const { bookingID, roomID } = req.body

    try {
        const bookingItem = await Booking.findOne({ _id: bookingID })
        bookingItem.status = 'Cancelled'
        await bookingItem.save()
        const room = await Room.findOne({ _id: roomID })
        const bookings = room.currentBookings
        const temp = bookings.filter(booking => booking.bookingID.toString() !== bookingID)
        room.currentBookings = temp

        await room.save()

        res.send('Your booking is cancelled successfully.')

    } catch (error) {
        return res.status(400).json({ error });;
    }

});

router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find()
    res.send(bookings)
  } catch (error) {
    return res.status(400).json({ error });
  }
});



module.exports = router