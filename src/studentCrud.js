import { MongoClient } from "mongodb";

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
    return collection.find(id).toArray();
}
async function updateStudentByName(collection, name, updateFields) {
    await collection.updateMany(
        { name },
        { $set: updateFields }
    )
}
async function deleteStudentById(collection, id) {
    await collection.deleteOne(id);
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
    await updateStudentByName(collection, studentObj.name, studentObj);
}
export async function readStudent(id) {
    const uri = process.env.DB_URI;
    let mongoClient;
    mongoClient = await connectToDB(uri);
    const db = mongoClient.db('school');
    const collection = db.collection('students');
    return await findStudentById(collection, id);
}
export async function removeStudent(stdID) {
    const uri = process.env.DB_URI;
    let mongoClient;
    mongoClient = await connectToDB(uri);
    const db = mongoClient.db('school');
    const collection = db.collection('students');
    await deleteStudentById(collection, stdID);
}
