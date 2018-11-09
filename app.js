import express from 'express';
import db from './db/db.js';

//import body-parser into app.js
import bodyParser from 'body-Parser';

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all parcel orders
app.get('/api/v1/parcels', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'Successfully retrieved all parcel orders',
    parcelData: db
  })
});

//create a parcel order
app.post('/api/v1/parcels', (req,res) => {
	if(!req.body.weight) {
		return res.status(400).send({
			success: 'false',
			message: 'weight is required'
		});
	} else if (!req.body.receiver_name) {
		return res.status(400).send({
			success: 'false',
			message: 'receiver\'s name is required'
		});
	} else if (!req.body.pickup) {
		return res.status(400).send({
			success: 'false',
			message: 'pickup location is required'
		});
	} else if (!req.body.destination) {
		return res.status(400).send({
			success: 'false',
			message: 'destination is required'
		});
	}
	const parcelData = {
		id: db.length + 1,
		weight: req.body.weight,
		receiver_name: req.body.receiver_name,
		pickup: req.body.pickup,
		destination: req.body.destination
	};

	db.push(parcelData);
	return res.status(201).send({
		success: 'true',
   		message: 'parcel order added successfully',
   		parcelData
   		});
});

//fetch a single parcel order
app.get('/api/v1/parcels/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);

	db.map((parcelData) => {
		if(parcelData.id === id) {
			return res.status(200).send({
				success: 'true',
				message: 'parcel order successfully retrieved',
				parcelData,
			});
		}
	});

	return res.status(404).send({
		success: 'false',
		message: 'parcel order does not exist',
	});
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});