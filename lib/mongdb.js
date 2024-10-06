import { MongoClient } from 'mongodb';

const uri = process.env.DATABASE_URL;
let client;
let clientPromise;

if (!process.env.DATABASE_URL) {
    throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so we don't recreate the connection on hot reload
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export default clientPromise;
