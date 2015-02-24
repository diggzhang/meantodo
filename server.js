//server.js 
	//set up ===============================
	var express = require('express');
	var app = express();
	var mongoose = require('mongoose');
	var morgan = require('morgan');
	var bodyParser = require('body-parser');
	var methodOverride = require('method-override');

	//configuration ======================

	//connect to database
	//mongoose.connect('mongodb://diggzhang:diggzhang@proximus.modulusmongo.net:27017/quxoda9G');
mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');
//	mongoose.connect('mongodb://nodetest:nodenode@proximus.modulusmongo.net:27017/y4noDano');
	//mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu');

	app.use(express.static(__dirname + '/public'));
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({'extended':'true'}));
	app.use(bodyParser.json());
	app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
	app.use(methodOverride());

	// define model ==============
	var Todo = mongoose.model('Todo', {
        text : String
    });

	// routes ========================
		//api ------------------------
		//get all todos
		app.get('/api/todos', function(req, res){
            
            //use mongoose to get all todos in database 
            Todo.find(function(err, todos){
                
                //get error log
                if(err)
                    res.send(err)
                res.json(todos);	//return all todo info as Json
            });
        });
		
		//create todo and send back all todos aftesr section
		app.post('/api/todos', function(req, res) {
            
            //Create todo, information comes from AJAX by angularjs
            Todo.create({
                text : req.body.text,
                done : false
            }, function(err, todo){
            	if(err) 
                    res.send(err);
                
                //get and return all the todos after you create another
                Todo.find(function(err, todos) {
                  	if(err)  
                        res.send(err)
                    res.json(todos);
                });
            });
        });

		//delete a todo tip
		app.delete('/api/todos/:todo_id', function(req, res){
            Todo.remove({
                _id : req.params.todo_id
            }, function(err, todo){
            	if(err) 
                    res.send(err);
                
                //when _id deleted, return all todos
                Todo.find(function(err, todos) {
                    if(err)
                        res.send(err)
                    res.json(todos);
                });
            });
        });


	// application ------------------------
	app.get('*', function(req, res){
    	res.sendfile('./public/index.html');
    });
	//listen
	app.listen(8080);
	console.log("App listenning on port 8080");
