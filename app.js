const express= require('express');
const morgan=require('morgan');
const helmet=require('helmet');


const host= "127.0.0.1"
const port= 5500

const restApi = require('./v1/rest');

const app=express();


app.use(morgan('dev'));
app.use(helmet());
app.use(express.static('public'));
app.use('/v1', restApi);

app.use((req,res)=>{
    res.status(400);
    res.json({
        Stutus:'Error',
        message:"Bad request"
    })
});

app.listen(port, host, ()=> {
    console.log(`server is on.  http://${host}:${port}`);
});

