import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get("/api/notes",async(req,res)=>{
   const result= await prisma.note.findMany()
    res.json(result);
})

app.post("/api/notes",async(req,res)=>{
    const {title,content,id} = req.body;

    if(!title || !content || !id)
        return res.status(400).send("invalid object")

    try {
        const note = await prisma.note.create({
            data:{title,content,id}
        })
        res.json(note) 
    } catch (error) {
        res.status(500).send("Opps something went wrong!!!")
    }
})

app.post("/api/post/:id",async(req,res)=>{
    const {title,content} = req.body;
    const{id} = req.body.id

    id(!id)
    {
        res.status(400).send("please provide ID");
    }
    try {
        const updatedNote =await prisma.note.update({where:{id},data:{title,content}})
        res.json(updatedNote)
    } catch (error) {
        res.status(500).send("Opps something went wrong!!!")
    }
})

app.put("/api/notes/:id",async(req,res)=>{
    const {title,content} = req.body;
    const id= parseInt(req.params.id)
    try {
        const updatedNote =await prisma.note.update({where:{id},data:{title,content}})
        res.json(updatedNote)
    } catch (error) {
        console.log(id)
        res.status(500).send("Opps something went wrong!!!")
    }
})

app.delete("/api/notes/:id",async(req,res)=>{
    const id= parseInt(req.params.id)
    try {
        const updatedNote =await prisma.note.delete({where:{id}})
        res.json(updatedNote)
    } catch (error) {
        console.log(id)
        res.status(500).send("Opps something went wrong!!!")
    }
})

app.listen(5000,()=>{
    console.log("app running in 5000");
})