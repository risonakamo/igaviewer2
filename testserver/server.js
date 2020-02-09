const express=require("express");

const app=express();

app.use(express.static(`${__dirname}/..`));

// http://localhost/#V1z82
app.listen(80,()=>{
    console.log("express started");
});