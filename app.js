var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/user_data");


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var userSchema = mongoose.Schema({
	id: Number,
	first_name: String,
	last_name: String,
	company_name: String,
	city: String,
	state: String,
	zip: Number,
	email: String,
	web: String,
	age: Number,
});

var User = mongoose.model("User", userSchema);

// This route is not complete
app.get("/api/users", function(req, res){
	User.find({}, function(err, allUsers){
		if(err) {
			res.send("Sorry there is an error");
		} else {
			res.render("index", {allUsers: allUsers});
			console.log(`Status Code ${res.statusCode}`);
		}
	}).sort({"id": 1}).limit(5)	
})

// Create a new user and request payload should be in JSON format
app.post("/api/users", function(req, res){
	var id = req.body.id;
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var company_name = req.body.company_name;
	var city = req.body.city;
	var state = req.body.state;
	var zip = req.body.zip;
	var email = req.body.email;
	var web = req.body.web;
	var age = req.body.age;
	var newUserData = { 
		id: id, 
		first_name: first_name, 
		last_name: last_name,
		company_name: company_name,
		city: city,
		state: state,
		zip: zip,
		email: email,
		web: web,
		age: age 
	}
	User.create(newUserData, function(err, newUserCreated){
		if(err) {
			console.log(err);
		} else {
			res.redirect("/api/users")
			console.log(`Status Code ${res.statusCode}`);
		}
		
	})	
})

// Get details of single user using id as the parameter
app.get("/api/users/:id", function(req, res){
	User.findOne({id: req.params.id}, function(err, singleUser){
		console.log(req.params.id);
		if(err) {
			res.redirect("/api/users")
		} else {
			res.render("show", {singleUser: singleUser});
			console.log(`Status Code ${res.statusCode}`);
		}
	})
})

// Update an existing user
app.put("/api/users/:id", function(req, res){
	var id = req.body.id;
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var company_name = req.body.company_name;
	var city = req.body.city;
	var state = req.body.state;
	var zip = req.body.zip;
	var email = req.body.email;
	var web = req.body.web;
	var age = req.body.age;
	var updatedUserData = { 
		id: id, 
		first_name: first_name, 
		last_name: last_name,
		company_name: company_name,
		city: city,
		state: state,
		zip: zip,
		email: email,
		web: web,
		age: age 
	}
	User.findByIdAndUpdate(req.params.id, updatedUserData, function(err, updatedUser){
		if(err) {
			console.log(err);
		} else {
			console.log(`Status Code ${res.statusCode}`);
			res.redirect("/api/users" + req.params.id);
		}
	})
});


// Delete the current user
app.delete("/api/users/:id", function(req, res){
	User.findOneAndDelete({id: req.params.id}, function(err){
		if(err){
			console.log(err);
		} else {
			res.redirect("/api/users/");
			console.log(`Status Code ${res.statusCode}`);
		}
	})
})




















app.listen(3000, function(){
	console.log("App is running on port 3000");
})
