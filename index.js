import express from "express";
const app = express();
const port = 3000;
var listOfTasks = ["get a dog", "buy a car"];
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
app.listen( port , ()=>{
    console.log(`The TO-DO server is running on port : ${port}`);
})