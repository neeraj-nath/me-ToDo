import express from "express";
import bodyParser from "body-parser" ;
import mongoose, { Schema } from "mongoose";
const app = express();
const port = 3000;
// var listOfPersonalTasks = [];
// var listOfWorkTasks = [];
mongoose.connect('mongodb://0.0.0.0:27017/me-ToDo');

const db = mongoose.connection;

db.on('error',()=>{
    console.error.bind('Error Connecting to Database');
});

db.once('open',()=>{
    console.log('Successfully connected to Database..');
});

const ToDoSchema = new Schema({
    name : {
        type : String,
        required : true
    }
});

const ToDoList = mongoose.model("ToDoList",ToDoSchema);
const WorkToDoList = mongoose.model("WorkToDoList", ToDoSchema);

app.use(bodyParser.urlencoded({ extended: false }));
// Static Middleware
app.use(express.static('public'));

app.get('/', async (req,res) => {
    try{
        var items = await ToDoList.find({}).exec();
        res.render('index.ejs', {
            listTitle: new Date().toDateString(),
            task : items,
            action : '/submit'
        })
        
    }catch(error){
        console.error("The error is :-",error.message);
        res.send('<h1>404!!</h1>');
    }
});

app.get('/work', async(req,res) => {
    try{
        var workItems = await WorkToDoList.find({}).exec();
        res.render('index.ejs', {
            listTitle: 'Work-ToDos',
            task : workItems,
            action : '/submit-work'
        })
    }catch(error){
        console.error("The error is :-",error.message);
        res.send('<h1>404!!</h1>');
    }
});
app.post('/submit', async(req,res) => {
    try{ 
        await ToDoList.create({ 
            name : req.body.task,
        });
        res.redirect('/');
    }catch(error){
        console.error(error.message);
        res.send('<h1>Some Error Occured!!</h1>');
    }
});
app.post('/submit-work', async(req,res) => {
    try{ 
        await WorkToDoList.create({ 
            name : req.body.task,
        });
        res.redirect('/work');
    }catch(error){
        console.error(error.message);
        res.send('<h1>Some Error Occured!!</h1>');
    }
})
app.listen( port , ()=>{
    console.log(`The TO-DO server is running on port : ${port}`);
})