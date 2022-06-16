const {MongoClient} = require("mongodb");
const {phones} = require("./iphones-data");
require("dotenv").config();
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@trycatchfinally.sra77.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db(process.env.MONGO_DB_NAME);
        const coll = db.collection("iphones");
        const result = await coll.insertMany(phones);
        console.log(result.insertedIds);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);