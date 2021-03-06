const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
	app.get("/api/customers", function (req, res) {
		// Here we add an "include" property to our options in our findAll query
		// We set the value to an array of the models we want to include in a left outer join
		// In this case, just db.Event
		db.Customer.findAll({
			include: [db.Event],
		}).then(function (dbCustomer) {
			res.json(dbCustomer);
		});
	});
	
	app.get("/api/customers/:id", function (req, res) {
		// Here we add an "include" property to our options in our findOne query
		// We set the value to an array of the models we want to include in a left outer join
		// In this case, just db.Event
		db.Customer.findOne({
			where: {
				id: req.params.id,
			},
			include: [db.Event],
		}).then(function (dbCustomer) {
			res.json(dbCustomer);
		});
	});

	app.get("/api/customer-profile", function (req, res) {
		db.Event.findAll(
			{}
			).then(Event => {
				res.json(Event)
		}).catch(err => console.log(err));
	});


	app.get("/api/customer-signup", function (req, res) {
		db.Customer.findAll(
			{}
			).then(Customer => {
				res.json(Customer)
		}).catch(err => console.log(err));
	});

	// Customer's events
	app.get("/api/event", function (req, res) {
		// Here we add an "include" property to our options in our findAll query
		// We set the value to an array of the models we want to include in a left outer join
		// In this case, just db.Event
		db.Event.findAll({
			include: [db.service],
		}).then(function (dbEvent) {
			res.json(dbEvent);
		});
	});

	// Customer event by id
	app.get("/api/events/:id", function (req, res) {
		// Here we add an "include" property to our options in our findOne query
		// We set the value to an array of the models we want to include in a left outer join
		// In this case, just db.Event
		db.Event.findOne({
			where: {
				id: req.params.id,
			},
			include: [db.service],
		}).then(function (dbEvent) {

			res.json(dbEvent);
		});
	});

	app.post("/api/customer-signup", function (req, res) {
		db.Customer.create({
			first_Name: req.body.first_Name,
			last_Name: req.body.last_Name,
			email: req.body.email,
		})
			.then(function () {
				res.redirect(200, "/customer-login");
			})
			.catch(function (err) {
				res.status(401).json(err);
			});
	});

	// app.post("/api/login", function (req, res) {
	// 	console.log("made post");
	// 	console.log(req.session);
	// 	//req.session.userId = req.session.passport.user.dataValues.id;
	// 	console.log(req.session.userId)
	// 	res.redirect("/customer");
	// });


	  // get user by email
	  app.get("/api/user/:email", function (req, res) {
		console.log(req.params.email);
		db.Customer.findAll({
		  where: {
			email: req.params.email,
		  },
		})
		  .then((user) => {
			res.json(user);
		  })
		  .catch((err) => {
			console.log(err);
			res.status(500).json({
			  error: true,
			  data: null,
			  message: "Unable to get user by email.",
			});
		  });
	  });

	// Route for getting some data about our Customer to be used client side
	app.get("/api/user_data", function(req, res) {
		if (!req.user) {
		  // The user is not logged in, send back an empty object
		  res.json({});
		} else {
		  // Otherwise send back the user's email and id
		  res.json({
			email: req.user.email,
			id: req.user.id
		  });
		}
	});

	// Customer services route
	app.post("/api/services", function (req, res) {
		db.Service.create({
			serviceName: req.body.serviceName,
		}).then(function (dbService) {
			res.json(dbService);
		});
	});


	app.post("/api/customer-create-event", function (req, res) {
		db.Event.create({
			eventName: req.body.eventName,
			eventDate: req.body.eventDate,
			startTime: req.body.startTime,
			endTime: req.body.endTime,
			eventType: req.body.eventType,
			guestCount: req.body.guestCount,
			address: req.body.address,
			city: req.body.city,
			state: req.body.state,
			zipCode: req.body.zipCode,
			description: req.body.description,
		})
			.then(function (dbEvent) {
				res.json(dbEvent);
			})
			.catch(function (err) {
				res.status(401).json(err);
			});
	});


	app.get("/api/customer-profile/:id", function (req, res) {
		db.Event.findOne({
		  where: {
			id: req.params.id
		  }
		})
		  .then(function(dbEvent) {
			res.json(dbEvent);
		  });
	  });


	// Delete a customer event
	app.delete("/api/customer-profile/:id", function (req, res) {
		db.Event.destroy({
			where: {
				id: req.params.id,
			},
		}).then(function (dbEvent) {
			res.json(dbEvent);
		});
	});

	// Delete customer by ID
	app.delete("/api/customers/:id", function (req, res) {
		db.Customer.destroy({
			where: {
				id: req.params.id,
			},
		}).then(function (dbCustomer) {
			res.json(dbCustomer);
		});
	});
};

