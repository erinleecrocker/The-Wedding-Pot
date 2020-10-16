const db = require("../models");

module.exports = function (app) {
	app.get("/api/events", function (req, res) {
		// Here we add an "include" property to our options in our findAll query
		// We set the value to an array of the models we want to include in a left outer join
		// In this case, just db.Event
		db.Event.findAll({
			include: [db.service],
		}).then(function (dbEvent) {
			res.json(dbEvent);
		});
	});

	app.get("/api/Events/:id", function (req, res) {
		// Here we add an "include" property to our options in our findOne query
		// We set the value to an array of the models we want to include in a left outer join
		// In this case, just db.Event
		db.Event.findOne({
			where: {
				id: req.params.id,
			},
			include: [db.Event],
		}).then(function (dbEvent) {
			res.json(dbEvent);
		});
	});

	app.post("/api/customer-create-event", function (req, res) {
		db.Event.create({
			eventName: req.body.eventName,
			eventType: req.body.eventType,
			guestCount: req.body.guestCount,
			eventDate: req.body.eventDate,
			startTime: req.body.startTime,
			endTime: req.body.endTime,
			address: req.body.address,
			city: req.body.city,
			state: req.body.state,
			zipCode: req.body.state,
		})
			.then(function (dbEvent) {
				res.json(dbEvent);
			})
			.catch(function (err) {
				res.status(401).json(err);
			});
	});

	app.delete("/api/Events/:id", function (req, res) {
		db.Event.destroy({
			where: {
				id: req.params.id,
			},
		}).then(function (dbEvent) {
			res.json(dbCustomer);
		});
	});
};