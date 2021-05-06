const path = require('path');
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/project', {useNewUrlParser: true, useUnifiedTopology: true});
const Cakes = mongoose.model('Menu', 
	{ name: String,
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

const exphbs  = require('express-handlebars');
 
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'handlebars'
})

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views','.\\views');
app.use(express.static('.\\'));


app.get('/admin', (req,res)=>{
	res.sendFile(path.resolve(__dirname, '.\\html', 'AdminPanel.html'));
});

app.get('/menu', (req,res)=>{
	res.sendFile(path.resolve(__dirname, '.\\html', 'MenuListPage.html'));
});

app.get('/menu/:id', (req,res)=>{
	const { id } = req.params;
	
	Cakes.findOne({_id:id}).then(data => {
		
		let temp = {
			name: data.name,
			src: data.src,
			description: data.description,
			price: data.price

		}
		res.render('element',temp);

	}).catch(()=> res.send("Error with acessing database"));
	}
);

app.listen(4000, function(){
	console.log('Static files serving');
});