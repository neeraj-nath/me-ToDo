import express from "express";
import bodyParser from "body-parser" ;
const app = express();
const port = 3000;
var listOfTasks = ["get a dog", "buy a car"];

app.use(bodyParser.urlencoded({ extended: false }));
// Static Middleware
app.use(express.static('public'));

app.get('/', (req,res) => {
    try{
        res.render('index.ejs', {
            task : listOfTasks
        });
    }catch(error){
        res.send('404!!');
    }
})
app.post('/submit',(req,res) => {
    try{ 
        const task = req.body.task;
        listOfTasks.push(task);
        res.redirect('/');
    }catch(error){
        console.error(error.message);
        res.send('<h1>Some Error Occured!!</h1>');
    }
})
app.listen( port , ()=>{
    console.log(`The TO-DO server is running on port : ${port}`);
})