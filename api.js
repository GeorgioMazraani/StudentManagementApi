import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { insertStudent, removeStudent, updateStudent, readStudent } from './src/studentCrud.js'

config();

var app = express();
app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.get("/readStudent", async (req, res) => {
    let data = await readStudent(req.body.stdId);
    res.status(200).json(data);
});

app.post('/addStudent', async (req, res) => {
    let student = req.body;
    await insertStudent(student);
    res.status(201).json({ message: 'Student added successfully', student });
})
app.put('/updateStudent', async (req, res) => {
    await updateStudent(req.body);
    res.send('updated');
})
app.delete('/removeStudent', async (req, res) => {
    await removeStudent(req.body.stdId);
    res.send('deleted');
})

app.listen(process.env.PORT);