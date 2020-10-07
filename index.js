const express = require('express');

const app = express();
const connectDB= require('./config/db') 

connectDB();

//Init middleware
app.use(express.json({extended:false}));

app.get('/',(req,res)=>{
    res.send("API running")
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}
app.use('/api/users',require('./Routes/API/users'));
app.use('/api/messages',require('./Routes/API/messages'));
app.use('/api/auth',require('./Routes/API/auth'));



const PORT= process.env.PORT || 4000;

app.listen(PORT,() => {console.log(`Listening on port ${PORT}`)});