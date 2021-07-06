const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


const app = express();

app.use(bodyParser.json());

app.use(cors());

const port = 5000;


app.get('/', (req, res) => {
    res.send ('hello i am working');
});

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.4xssl.mongodb.net/${process.env.DB_USER}?retryWrites=true&w=majority`;
const m = 6;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true },{ connectTimeoutMS: 30000 }, { keepAlive: 1});
client.connect(err => {
  const appointmentCollection = client.db("DoctosPortal").collection("Appointment");
  
app.post('/addAppointment', (req, res) => {
  const appointment = req.body;
  console.log(appointment)
  appointmentCollection.insertOne(appointment)
  .then(result => {
  res.send(result.insertedCount > 0 );
  })
})

});

app.listen(port);

