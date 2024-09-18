import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import { insertStudent, removeStudent, updateStudent, readStudent, readAllStudents } from './src/studentCrud.js'

config();

var app = express();
app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.get("/readStudent", async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({ message: 'Student ID is required' });
    }
    let data = await readStudent(id);
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

app.get("/readAllStudents", async (req, res) => {
    let data = await readAllStudents();
    res.status(200).json(data);
});



app.post('/addStudent', async (req, res) => {
    let student = req.body;
    await insertStudent(student);
    res.status(201).json({ message: 'Student added successfully', student });
})

app.put("/updateStudent", async (req, res) => {
    const { id } = req.query;  // Extract id from query
    const updateFields = req.body;
    if (!id) {
        return res.status(400).json({ message: 'Student ID is required' });
    }
    await updateStudent({ id, ...updateFields });
    res.status(200).send('Updated Successfully!');

});
app.delete("/removeStudent", async (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({ message: 'Student ID is required' });
    }
    await removeStudent(id);
    res.status(200).send('Deleted Successfully!');

});


app.listen(process.env.PORT);