const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://CPES5_PRAN:9pPFBUqIAUbqIq4a@cluster0.vkk9ndn.mongodb.net/MERN-CustomerInfo'
mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true})

var connection = mongoose.connection
connection.on('error', ()=>{
    console.log('MongoDB Connection failed.')
})

connection.on('connected', ()=>{
    console.log('MongoDB Connection successful')
})

module.exports = mongoose