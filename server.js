const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/project', {useNewUrlParser: true, useUnifiedTopology: true});
const Cakes = mongoose.model('Menu', 
	{ name: {type: String, required: true},
	  price: Number,
	  src: String,
	  description: String,
	  isShown: {type: Boolean, default: true},
	  category: String}, 'Menu');

let allowCrossDomain = function(req, res, next){
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Header', "*");
	next();
}
app.use(express.json());
app.use(allowCrossDomain);
app.use(express.static('public'));
app.use(morgan());

app.use(express.static('.\\'));


app.get('/menu', (req, res)=>{
	res.sendFile(path.resolve(__dirname, '.\\html', 'MenuListPage.html'));
});

app.get('/menu/load', (req, res)=>{
	Cakes.find({isShown: true}).then(data => res.send(data)).catch(()=> res.send("Error with acessing database"));
});

app.get('/menu/:category', (req, res)=>{

	const {category} = req.params;
	if(category==="all"){
		Cakes.find({isShown: true}).then(data => res.send(data)).catch(()=> res.send("Error with acessing database"));
	}
	else{
		console.log(category);
		Cakes.find({category: category.toLowerCase(), isShown: true}).then(data => res.send(data)).catch(()=> res.send("Error with acessing database"));

	}
	
});

app.get('/menu/:category/:name', (req, res)=>{

	const {category, name} = req.params;
	if(category==="all"){
		Cakes.find({name: name, isShown: true}).then(data => res.send(data)).catch(()=> res.send("Error with acessing database"));
	}
	else{
		console.log(category, name);
		Cakes.find({category: category.toLowerCase(), name: name, isShown: true}).then(data => res.send(data)).catch(()=> res.send("Error with acessing database"));

	}
	
});


app.get('/admin', (req,res)=>{
	res.sendFile(path.resolve(__dirname, '.\\html', 'AdminPanel.html'));
});

app.get('/admin/load', (req, res)=>{
	Cakes.find({}).then(data => res.send(data)).catch(()=> res.send("Error with acessing database"));
});


app.post('/admin', (req, res)=>{
	const { name, price, src, description, category } = req.body;
	const cake = new Cakes({
		name: name,
		price: price,
		src: src,
		description: description,
		category: category
	});
	cake.save().then(()=> res.send("saved")).catch(()=>res.send("Error with acessing database"));
	
});

app.delete('/admin/:id', (req,res)=>{
	const {id} = req.params;
	Cakes.findOneAndUpdate({_id: id}, {isShown: false}).then(()=> res.send('deleted')).catch(()=>res.send("Error with acessing database"));

});

app.put('/admin/retrive/:id', (req, res)=>{
	const {id} = req.params;
	Cakes.findOneAndUpdate({_id: id}, {isShown: true}).then(()=> res.send(newData)).catch(()=>res.send("Error with acessing database"));
});

app.put('/admin/update/:id', (req, res)=>{
	const {id} = req.params;
	const { name, price, src, description, category } = req.body;
	Cakes.findOneAndUpdate({_id: id}, {name: name, price: price, src: src, description: description, category: category}).then(()=> res.send("updated")).catch(()=>res.send("Error with acessing database"));
});

app.listen(3000, function(){
	console.log('Server 3000 is listening');
});