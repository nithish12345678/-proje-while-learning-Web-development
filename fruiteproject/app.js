const MongoClient = require("mongodb").MongoClient;

const assert = require("assert");


// Replace the uri string with your connection string.
const uri = "mongodb://0.0.0.0:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    const database1 = client.db("fruitsDB");
    const fruits = database1.collection('fruits');
    const query1 = { name:'mango', season:'summer'};
    const f = await fruits.insertOne(query1);
    console.log(fruits.find());

    //
    const database = client.db('shopDB');
    const product = database.collection('product');
    // Query for a movie that has the title 'Back to the Future'
    const query = { name: 'pencil' };
    const movie = await product.findOne(query);
    console.log(movie.cost);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);