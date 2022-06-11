const express = require('express');
const cors = require('cors');
// environment variable setup
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.2aeqs.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const IOTCollection = client.db("user-dashboard").collection("products");

        // GET ALL Product 
        app.get('/items', async (req, res) => {
            const query = {};
            const cursor = IOTCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        // POST api 
        app.post('/item', async (req, res) => {
            const newItem = req.body;
            console.log(newItem)
            const result = await IOTCollection.insertOne(newItem);
            res.send(result);
        });

        // DELETE api 

        app.delete('/item/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await IOTCollection.deleteOne(query);
            res.send(result);
        });


    } finally {

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Running Dashboard Server");
});

app.listen(port, () => {
    console.log("Listening to port", port);
})
