import express from "express";
import fs from 'fs'
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";
import imageModel from './models/userschema.js'
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("conected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
// storage

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).single("testimage");


app.get("/", (req, res) => {
  imageModel.find()
  .then((data)=>{
    res.send(data)
  }).catch((err)=>{
    console.log(err);
  })
});

// app.get('/',async (req,res)=>{
//   const allData = await imageModel.find()
//   res.json(allData)
// })

app.post('/upload',(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            const newImage=new imageModel({
                name:req.body.name,
                image:{
                  data: fs.readFileSync("uploads/" + req.file.filename),
                  contentType: "image/png",
                }
            })
            newImage.save()
            .then(()=>{
                res.send('sucess')
                console.log('sucess');
            }).catch((err)=>{
                console.log(err)
            })
        }
    })
})

app.listen(process.env.PORT || 7000, () => {
  console.log(` App listening on port 7000`);
});
