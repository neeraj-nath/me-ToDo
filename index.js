import express from "express";
import bodyParser from "body-parser" ;
const app = express();
const port = 3000;
var listOfPersonalTasks = ["get a dog", "buy a car"];
var listOfWorkTasks = ['Crack a better salary job'];

app.use(bodyParser.urlencoded({ extended: false }));
// Static Middleware
app.use(express.static('public'));

app.get('/', (req,res) => {
    try{
        res.render('index.ejs', {
            listTitle: new Date().toDateString(),
            task : listOfPersonalTasks,
            action : '/submit'
        });
    }catch(error){
        res.send('404!!');
    }
});
app.get('/work', (req,res) => {
    try{
        res.render('index.ejs', {
            listTitle: 'Work To-Dos',
            task : listOfWorkTasks,
            action : '/submit-work'
        });
    }catch(error){
        res.send('404!!');
    }
});
app.post('/submit',(req,res) => {
    try{ 
        const task = req.body.task;
        listOfPersonalTasks.push(task);
        res.redirect('/');
    }catch(error){
        console.error(error.message);
        res.send('<h1>Some Error Occured!!</h1>');
    }
});
app.post('/submit-work',(req,res) => {
    try{ 
        const task = req.body.task;
        listOfWorkTasks.push(task);
        res.redirect('/');
    }catch(error){
        console.error(error.message);
        res.send('<h1>Some Error Occured!!</h1>');
    }
})
app.listen( port , ()=>{
    console.log(`The TO-DO server is running on port : ${port}`);
})