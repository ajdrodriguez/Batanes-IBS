const express = require("express");
const router = express.Router();

const Room = require('../models/room')

router.get("/getallrooms", async (req, res) => {

    try {
        const rooms = await Room.find({})
        res.send(rooms)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/getroombyid", async (req, res) => {

    const roomid = req.body.roomid

    try {
        const room = await Room.findOne({ _id: roomid })
        res.send(room)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
});

router.post("/addroom", async (req, res) => {

    const newRoom = new Room({
        name: req.body.name,
        rentPerDay: req.body.rentPerDay,
        maxCount: req.body.maxCount,
        description: req.body.description,
        phoneNumber: req.body.phoneNumber,
        type: req.body.type,
        imageURLs: [req.body.imageURLs[0], req.body.imageURLs[1], req.body.imageURLs[2]]
    });
    try {
        const room = await newRoom.save()
        res.send('New Room Added Successfully.')
    } catch (error) {
        return res.status(400).json({ error });
    }
});



module.exports = router;