import { MongoClient } from "mongodb";

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not defined in the environment variables.");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri = process.env.MONGO_URI;
const options = { maxPoolSize: 10 };

let client;
let clientPromise: Promise<MongoClient>;

if(process.env.NODE_ENV === "development") {
    //prevent multiple connections in development with global variable
    if(!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();   
}

export default clientPromise;