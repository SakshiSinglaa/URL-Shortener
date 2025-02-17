import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { nanoid } from 'nanoid'
import dotenv from 'dotenv'
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json())


// Connection to MongoDB Database
mongoose.connect(process.env.DATABASE_URL)
        .then(() => {console.log("Database connected successfully")})
        .catch((err) => console.log("Failed to connect database", err))

const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String, 
    clicks: {type: Number, default: 0},
})

const Url = mongoose.model('URL', urlSchema)

app.post('/api/short', async(req, res) => {
    try{
        const { originalUrl } = req.body
        if(!originalUrl)
            return res.status(400).json({error: "Originalurl error"})
        const shortUrl = nanoid(5)
        const url = new Url({originalUrl, shortUrl})
        await url.save()
        res.status(200).json({message: "URL Generated", url: url})
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: "Server error"})
    }
})

app.get('/:shortUrl', async(req, res) => {
    try{
        const { shortUrl } = req.params 
        const url = await Url.findOne({shortUrl})
        if(url) {
            url.clicks++;
            await url.save();
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json({error: "Url not found"});
        }
    }
    catch(error){
        console.log(error);
        res.status(500).json({error: "Server error"})
    }
})


app.listen(process.env.PORT, () => {console.log("Server is running at port 3000")})
