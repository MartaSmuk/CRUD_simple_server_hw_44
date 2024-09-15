import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = 'items';

const client = new MongoClient(MONGO_URL);
let collection;

async function connectToMongoDB() {
    try {
        await client.connect();
        const db = client.db(DB_NAME);
        collection = db.collection(COLLECTION_NAME);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        throw err;
    }
}

async function disconnectFromMongoDB() {
    if (client) {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

// CRUD functions
async function createItem(name) {
    const result = await collection.insertOne({ name });
    return await collection.findOne({ _id: result.insertedId });
}

async function getItems() {
    return await collection.find({}).toArray();
}

async function getItemById(id) {
    if (!ObjectId.isValid(id)) throw new Error('Invalid ObjectId');
    return await collection.findOne({ _id: new ObjectId(id) });
}

async function updateItem(id, name) {
    if (!ObjectId.isValid(id)) throw new Error('Invalid ObjectId');
    return await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { name } }
    );
}

async function deleteItem(id) {
    if (!ObjectId.isValid(id)) throw new Error('Invalid ObjectId');
    return await collection.deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
    createItem,
    getItems,
    getItemById,
    updateItem,
    deleteItem,
};
