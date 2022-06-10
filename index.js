// user: Rasel
// S9OTUipT4hgH6IRh
const express = require('express');
const cors = require('cors');
// environment variable setup
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.sz491.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const IOTCollection = client.db("user-dashboard").collection("products");

        // GET ALL Product 

        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        // POST api 
        app.post("/product", async (req, res) => {
            const newProduct = req.body;
            const result = await IOTCollection.insertOne(newProduct);
            res.send(result);
        });


    } finally {
        await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Running Genius Server");
});

app.listen(port, () => {
    console.log("Listening to port", port);
})
