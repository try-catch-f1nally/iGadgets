const {MongoClient} = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
    "mongodb+srv://try_catch_finally:iGadgets2022@trycatchfinally.sra77.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const {phones} = require("./iphonesData");

async function run() {
    try {
        await client.connect();
        // database and collection code goes here
        // insert code goes here
        // display the results of your operation
        const db = client.db("iGadgets");
        const coll = db.collection("iphones");
        const result = await coll.insertMany(phones);
        console.log(result.insertedIds);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);