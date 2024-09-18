import { MongoClient } from "mongodb";
import { ObjectId } from 'mongodb';


export async function connectToDB(uri) {
    try {
        const mongoClient = new MongoClient(uri);
        await mongoClient.connect();
        console.log("Connection to MongoDb Succeeded!");
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDb failed!', error);
    }
}
async function createStudentDocument(collection, studentObj) {
    await collection.insertOne(studentObj);
}

async function findStudentById(collection, id) {
    return collection.find({ _id: new ObjectId(id) }).toArray();
}


async function updateStudentById(collection, id, updateFields) {
    await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateFields }
    );
}

async function deleteStudentById(collection, id) {
    collection.deleteOne({ _id: new ObjectId(id) });
}

export async function insertStudent(studentObj) {
    const uri = process.env.DB_URI;
    let mongoClient;
    mongoClient = await connectToDB(uri);
    const db = mongoClient.db('school');
    const collection = db.collection('students');
    await createStudentDocument(collection, studentObj);
}
export async function updateStudent(studentObj) {
    const uri = process.env.DB_URI;
    let mongoClient = await connectToDB(uri);
    const db = mongoClient.db('school');
    const collection = db.collection('students');

    const { id, ...updateFields } = studentObj;
    await updateStudentById(collection, id, updateFields);
}

export async function readStudent(id) {
    const uri = process.env.DB_URI;
    let mongoClient;
    mongoClient = await connectToDB(uri);
    const db = mongoClient.db('school');
    const collection = db.collection('students');
    return await findStudentById(collection, id);
}

export async function removeStudent(id) {
    const uri = process.env.DB_URI;
    let mongoClient = await connectToDB(uri);
    const db = mongoClient.db('school');
    const collection = db.collection('students');

    await deleteStudentById(collection, id);
}

