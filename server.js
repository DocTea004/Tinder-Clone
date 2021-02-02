import express from "express";
import mongoose from "mongoose";
import cards from "./dbCards.js";
import cors from "cors";

const app = express();
const Port = process.env.PORT || 8001;
const connection_url= "mongodb+srv://admin:kwame123@cluster0.k8rc1.mongodb.net/tinderdb?retryWrites=true&w=majority"

//Middlewares
app.use(express.json());
app.use(cors());

//DB Config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:true,
    },err=>{
        if (err){
            console.log(err);
        }
        else{
            console.log("Database connected......")
        }
    }

)


//API Endpoints 

app.get("/", (req,res)=>{
    res.status(200).send("Hello , welcome to Dex Web Development")
});

app.post("/tinder/card",(req,res)=>{
    const dbCard = req.body;

    cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    })

});

app.get("/tinder/card",(req,res)=>{
    cards.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }

        else{
            res.status(200).send(data);
        }
    })
})

app.listen(Port, ()=>{
    console.log(`Listening on localhost: ${Port}`);
})