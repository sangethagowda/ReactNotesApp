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

app.listen(5000,()=>{
    console.log("app running in 5000");
})